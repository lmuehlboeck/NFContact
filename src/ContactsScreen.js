import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert, ToastAndroid, PermissionsAndroid } from 'react-native';
import ContactsCard from './ContactsCard';
import AddButton from './AddButton.js'
import TopBar from './TopBar'
import { Modal, Portal, useTheme, Text, Dialog, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { db } from './Database';
import { selectContactPhone } from 'react-native-select-contact';
import Contacts from 'react-native-contacts'

import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const styles = require('./styles.js')


NfcManager.start()
let session

export default function ContactsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [errorDialogVisible, setErrorDialogVisible] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [modalText, setModalText] = useState("")
    const theme = useTheme()
    const [contacts, setContacts] = useState({})
    const isFocused = useIsFocused()
    const [receivedData, setReceivedData] = useState({})

    const showErrorDialog = text => {
        setModalVisible(false)
        setErrorDialogVisible(true)
        setErrorText(text)
    }


    const sendNFCData = async data => { 
        const tag = new NFCTagType4({
            type: NFCTagType4NDEFContentType.Text,
            content: JSON.stringify(data),
            writable: false
        });
        
        session = await HCESession.getInstance();
        session.setApplication(tag);
        await session.setEnabled(true).catch((err) => console.log(err));
    }
    
    const stopSending = async () => {
        if(session)
            await session.setEnabled(false)
    }
    
    async function readNFCData() {
        stopSending()
        await NfcManager.requestTechnology(NfcTech.Ndef)
            .then(() => NfcManager.getTag())
            .then(tag => {
                if(tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
                    let dataRaw = String.fromCharCode(...tag.ndefMessage[0].payload)
                    try {
                        let data = JSON.parse(dataRaw.substring(3, dataRaw.length))
                        setReceivedData(data)
                    } catch {
                        showErrorDialog("Die übertragenen Daten können nicht verarbeitet werden.")
                    }
                } else {
                    showErrorDialog("Auf diesem NFC-Tag befinden sich keine Daten.")
                }
            })
            .catch(err => {
                console.warn(err)
            })
            .then(() => {NfcManager.cancelTechnologyRequest()})
    }


    const sendContact = (contact) => {
        setModalVisible(true)
        setModalText((contact.firstname ? contact.firstname : '') + (contact.lastname ? ' ' + contact.lastname : '') + " wird gesendet")
        console.log(contact)
        sendNFCData(contact)
    }

    const receiveContact = () => {
        setModalVisible(true)
        setModalText("Bereit zum Empfangen")
        readNFCData()
    }

    const loadContacts = () => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT * FROM contacts WHERE received=?",
                [props.received ? 1 : 0],
                (tx, res) => {
                    let c = []
                    for(let i = 0; i < res.rows.length; i++)
                        c.push(res.rows.item(i))
                    setContacts(c)
                },
                err => console.log(err)
            )
        })
    }

    const searchContacts = (query) => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT id,firstname,lastname,tel,email FROM contacts WHERE received=? AND (firstname || ' ' || lastname LIKE ? OR tel LIKE ? OR email LIKE ?)",
                [props.received ? 1 : 0, `%${query}%`, `%${query}%`, `%${query}%`],
                (tx, res) => {
                    let c = []
                    for(let i = 0; i < res.rows.length; i++)
                        c.push(res.rows.item(i))
                    setContacts(c)
                },
                err => console.log(err)
            )
        })
    }

    const importContact = async () => {
        const request = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        if(request === PermissionsAndroid.RESULTS.DENIED || request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            showErrorDialog("Ohne Berechtigungen können keine Kontakte importiert werden")
            return
        }
        const selection = await selectContactPhone()
        if (!selection)
            return
                
        let { contact, selectedPhone } = selection
        db.transaction(txn => {
            txn.executeSql("INSERT INTO contacts (received,firstname,lastname,tel,email,address) VALUES (0,?,?,?,?,?)",
                [contact.givenName, contact.familyName, selectedPhone.number, 
                    contact.emails.length === 0 ? '' : contact.emails[0], contact.postalAddresses.length === 0 ? '' : contact.postalAddresses[0].formattedAddress],
                (tx, res) => {
                    ToastAndroid.show('Kontakt importiert', ToastAndroid.SHORT)
                    loadContacts()
                },
                err => console.log(err))
        })
    }

    const exportContact = async (contact) => {
        const request = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS)
        if(request === PermissionsAndroid.RESULTS.DENIED || request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            showErrorDialog("Ohne Berechtigungen können keine Kontakte exportiert werden")
            return
        }
        let exportContact = {}
        if(contact.firstname && contact.firstname !== "") exportContact.givenName = contact.firstname
        if(contact.lastname && contact.lastname !== "") exportContact.familyName = contact.lastname
        if(contact.tel && contact.tel !== "") exportContact.phoneNumbers = [{label: 'Mobil', number: contact.tel}]
        if(contact.email && contact.email !== "") exportContact.emailAddresses = [{label: 'Privat', email: contact.email}]
        if(contact.address && contact.address !== "") exportContact.postalAddresses = [{label: 'Privat', formattedAddress: contact.address}]
        if(contact.company && contact.company !== "") exportContact.company = contact.company
        console.log(exportContact)
        Contacts.addContact(exportContact).then(() => ToastAndroid.show("Kontakt wurde exportiert", ToastAndroid.SHORT))
    }

    useEffect(() => {
        if(receivedData && "firstname" in receivedData && "lastname" in receivedData && "tel" in receivedData && 
            "email" in receivedData && "address" in receivedData && "company" in receivedData && "website" in receivedData) {
            console.log("true")
            db.transaction(txn => {
                txn.executeSql("INSERT INTO contacts (received,firstname,lastname,tel,email,address,company,website) VALUES (1,?,?,?,?,?,?,?)",
                    [receivedData.firstname, receivedData.lastname, receivedData.tel, receivedData.email, receivedData.address, receivedData.company, receivedData.website],
                    err => console.log(err)
                )
            })
            setModalVisible(false)
            loadContacts()
            ToastAndroid.show((receivedData.firstname ? receivedData.firstname : '') + (receivedData.lastname ? ' ' + receivedData.lastname : '') + " wurde empfangen", ToastAndroid.SHORT )
            setReceivedData({})
        } else if(Object.keys(receivedData).length !== 0) {
            showErrorDialog("Der übertragene Kontakt ist fehlerhaft.")
            setReceivedData({})
        }
    }, [receivedData])

    useEffect(() => {
        loadContacts()
    }, [isFocused])

    return (
        <View style={styles.viewStyle}>
            <Portal style={styles.portalStyle}>
                <Modal visible={modalVisible} onDismiss={() => {setModalVisible(false); stopSending();}} contentContainerStyle={[{backgroundColor: theme.colors.secondaryContainer}, styles.modalStyle]}>
                    <Icon name="access-point" size={128} color={theme.colors.onBackground}/>
                    <Text variant='bodyLarge'>{modalText}</Text>
                </Modal>
                <Dialog visible={errorDialogVisible} onDismiss={() => setErrorDialogVisible(false)}>
                    <Dialog.Title>Fehler</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyLarge">{errorText}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setErrorDialogVisible(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <TopBar changeTheme={props.changeTheme} onSearchQueryChange={query => searchContacts(query)} />
            {
                contacts.length == 0 ? <Text style={{color: theme.colors.outline, marginTop: 10}}>Keine Kontakte gefunden</Text> : ''
            }
            <FlatList
                contentContainerStyle={styles.flatListContainerStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ContactsCard firstname={item.firstname}
                                                      lastname={item.lastname} 
                                                      tel={item.tel} 
                                                      email={item.email} 
                                                      received={props.received} 
                                                      onPressEdit={() => props.navigateEdit(item.id)} 
                                                      onPressSend={() => sendContact(item)}
                                                      onPressExport={() => exportContact(item)}/>}
                keyExtractor={item => item.id}
                data={contacts}
            />
            <AddButton actions={ props.received ? [
                {icon: "trash-can-outline", label: "Mehrere Kontakte löschen", onPress: props.navigateDelete},
                {icon: "export", label: "Mehrere Kontakte exportieren", onPress: () => Alert.alert('Achtung!', 'Work in progress')},
                {icon: "cellphone-nfc", label: "Kontakt empfangen", onPress: () => receiveContact()}
            ] : [
                {icon: "cellphone-nfc", label: "Mehrere Kontakte senden", onPress: () => Alert.alert('Achtung!', 'Work in progress')},
                {icon: "account-multiple-plus", label: "Aus Kontakten importieren", onPress: () => importContact()},
                {icon: "account-plus", label: "Kontakt erstellen", onPress: () => props.navigateCreate()}
            ]}/>
        </View>

    );
}