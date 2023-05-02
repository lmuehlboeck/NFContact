import React from 'react';
import { FlatList, View } from 'react-native';
import ContactsCard from './ContactsCard';
import SearchBar from './TopBar';
import AddButton from './AddButton.js'
import TopBar from './TopBar'

const styles = require('./styles.js')



export default function MyContactsScreen(props) {
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

    return (
        <View style={styles.viewStyle}>
            <TopBar changeTheme={props.changeTheme} />
            <FlatList
                contentContainerStyle={styles.flatListContainerStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ContactsCard name={item.name} tel={item.tel} email={item.email} received={false} />}
                keyExtractor={(item) => item.id}
                data={data}
                />
            <AddButton actions={[{icon: "cellphone-nfc", label: "Kontakt senden"},{icon: "account-plus", label: "Kontakt erstellen"},{icon: "account-multiple-plus", label: "Aus Kontakten importieren"}]}/>
        </View>
    );
}