import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import ContactsCard from './ContactsCard';
import SearchBar from './TopBar';
import AddButton from './AddButton.js'
import TopBar from './TopBar'
import { Modal, Portal, useTheme, Text } from 'react-native-paper';

const styles = require('./styles.js')



export default function MyContactsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false)
    
    const [modalText, setModalText] = useState("ID senden")

    const theme = useTheme()
    const data =  [
        {
            id: 1,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 2,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 3,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 4,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 5,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 6,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 7,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 8,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 9,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
        {
            id: 10,
            name: "Max Mustermann",
            tel: "Tel.: 0670/1234567",
            email: "E-Mail: max@mustermann.at"
        },
    ]

    const sendContact = (id) => {
        setModalVisible(true);
        setModalText(id + " senden...")
    }

    return (
        <View style={styles.viewStyle}>
            <Portal style={styles.portalStyle}>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={[{backgroundColor: theme.colors.secondaryContainer}, styles.modalStyle]}>
                    <Text>{modalText}</Text>
                </Modal>
            </Portal>
            <TopBar changeTheme={props.changeTheme}/>
            <FlatList
                contentContainerStyle={styles.flatListContainerStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ContactsCard name={item.name} tel={item.tel} email={item.email} received={false} onPressSend={() => sendContact(item.id)}/>}
                keyExtractor={(item) => item.id}
                data={data}
                />
            <AddButton actions={[{icon: "cellphone-nfc", label: "Mehrere Kontakte senden"},{icon: "account-plus", label: "Kontakt erstellen"},{icon: "account-multiple-plus", label: "Aus Kontakten importieren"}]}/>
        </View>

    );
}