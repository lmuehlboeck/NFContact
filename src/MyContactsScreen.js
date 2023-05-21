import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert } from 'react-native';
import ContactsCard from './ContactsCard';
import AddButton from './AddButton.js'
import TopBar from './TopBar'
import { Modal, Portal, useTheme, Text } from 'react-native-paper';
const styles = require('./styles.js')
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { db } from './Database';



export default function MyContactsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalText, setModalText] = useState("ID senden")
    const theme = useTheme()
    const navigation = useNavigation()
    const [contacts, setContacts] = useState({})

    const sendContact = id => {
        setModalVisible(true);
        setModalText(id + " senden...")
    }

    const loadContacts = () => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT id,firstname,lastname,tel,email FROM contacts WHERE received=0",
                [],
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

    useEffect(() => {
        loadContacts()
    })

    return (
        <View style={styles.viewStyle}>
            <Portal style={styles.portalStyle}>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={[{backgroundColor: theme.colors.secondaryContainer}, styles.modalStyle]}>
                    <Text>{modalText}</Text>
                    <Icon name="contactless-payment" size={128} color={theme.colors.onBackground}/>
                </Modal>
            </Portal>
            <TopBar changeTheme={props.changeTheme}/>
            <FlatList
                contentContainerStyle={styles.flatListContainerStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ContactsCard firstname={item.firstname}
                                                      lastname={item.lastname} 
                                                      tel={item.tel} 
                                                      email={item.email} 
                                                      received={false} 
                                                      onPressEdit={() => props.navigateEdit(item.id)} 
                                                      onPressSend={() => sendContact(item.id)}/>}
                keyExtractor={item => item.id}
                data={contacts}
                />
            <AddButton actions={[
                {icon: "cellphone-nfc", label: "Mehrere Kontakte senden", onPress: () => Alert.alert('Achtung!', 'Work in progress')},
                {icon: "account-plus", label: "Kontakt erstellen", onPress: props.navigateCreate},
                {icon: "account-multiple-plus", label: "Aus Kontakten importieren", onPress: () => Alert.alert('Achtung!', 'Work in progress')}
            ]}/>
        </View>

    );
}