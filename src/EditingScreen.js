import React, { useEffect,  useState } from 'react';
import { ScrollView, View, ToastAndroid } from 'react-native';
import { IconButton, TextInput, useTheme, Button, Text, Dialog, Portal } from 'react-native-paper';
import { db } from './Database'
import { useNavigation } from '@react-navigation/native';

const styles = require('./styles.js')

export default function EditingScreen(props) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')
    const [website, setWebsite] = useState('')

    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false)

    const theme = useTheme()
    const navigation = useNavigation()

    const load = () => {
        db.transaction(txn => {
            txn.executeSql('SELECT * FROM contacts WHERE id=?', [props.contactId], (tx, res) => {
                if(res.rows.length > 0) {
                    const c = res.rows.item(0)
                    setFirstname(c.firstname ? c.firstname : '')
                    setLastname(c.lastname ? c.lastname : '')
                    setTel(c.tel ? c.tel : '')
                    setEmail(c.email ? c.email : '')
                    setAddress(c.address ? c.address : '')
                    setCompany(c.company ? c.company : '')
                    setWebsite(c.website ? c.website : '')
                }
            }, err => console.log(err))
        })
    }

    const saveContact = () => {
        db.transaction(txn => {
            txn.executeSql('UPDATE contacts SET firstname=?, lastname=?, tel=?, email=?, address=?, company=?, website=? WHERE id=?',
                [firstname, lastname, tel, email, address, company, website, props.contactId],
                (tx, res) => navigation.goBack(),
                err => console.log(err))
        })
    }

    const createContact = () => {
        db.transaction(txn => {
            txn.executeSql('INSERT INTO contacts (received,firstname,lastname,tel,email,address,company,website) VALUES (0,?,?,?,?,?,?,?)',
                    [firstname, lastname, tel, email, address, company, website],
                    (tx, res) => {
                        navigation.goBack()
                        ToastAndroid.show('Kontakt wurde erstellt', ToastAndroid.SHORT)
                    },
                    err => console.log(err))
        })
    }

    const deleteContact = () => {
        db.transaction(txn => {
            txn.executeSql('DELETE FROM contacts WHERE id=?', 
                [props.contactId],
                (tx, res) => {
                    navigation.goBack()
                    ToastAndroid.show('Kontakt wurde gelöscht', ToastAndroid.SHORT)
                },
                err => console.log(err))
        })
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                  onPress={() => {
                    if(props.editing)
                        saveContact()
                    else
                        createContact()
                  }}
                  mode='contained'>
                    Speichern
                </Button>
              ),
        })
    }, [saveContact])

    return(
        <View>
            <Portal>
                <Dialog visible={deleteConfirmVisible} onDismiss={() => setDeleteConfirmVisible(false)}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">Sind Sie sich sicher, dass dieser Kontakt unwiderruflich gelöscht werden soll?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDeleteConfirmVisible(false)}>Nein</Button>
                        <Button onPress={() => deleteContact()}>Ja</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <ScrollView StickyHeaderComponent={<IconButton icon="camera" iconColor={theme.colors.onBackground} size={20}/>}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput label="Vorname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]} 
                            value={firstname} onChangeText={text => {setFirstname(text)}} />
                    <TextInput label="Nachname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]} 
                            value={lastname} onChangeText={text => setLastname(text)} />
                </View>
                <TextInput label="Telefonnummer" right={<TextInput.Icon icon="phone" />} style={styles.editingInput} 
                            value={tel} onChangeText={text => setTel(text)} />
                <TextInput label="E-Mail" right={<TextInput.Icon icon="email" />} style={styles.editingInput} 
                            value={email} onChangeText={text => setEmail(text)} />
                <TextInput label="Adresse" right={<TextInput.Icon icon="map-marker" />} style={styles.editingInput} 
                            value={address} onChangeText={text => setAddress(text)} />
                <TextInput label="Unternehmen" right={<TextInput.Icon icon="briefcase" />} style={styles.editingInput} 
                            value={company} onChangeText={text => setCompany(text)} />
                <TextInput label="Website" right={<TextInput.Icon icon="web" />} style={styles.editingInput} 
                            value={website} onChangeText={text => setWebsite(text)} />
                
                {props.editing ? 
                    <Button mode='contained' 
                            style={{backgroundColor: theme.colors.error, margin: 10}}
                            onPress={() => setDeleteConfirmVisible(true)}>
                        <Text style={{color: theme.colors.onError}}>Kontakt Löschen</Text>
                    </Button>
                    : ''
                }
                
            </ScrollView>
        </View>
    )
}