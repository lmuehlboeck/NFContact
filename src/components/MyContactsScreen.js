import React from 'react';
import { FlatList, View } from 'react-native';
import ContactsCard from './ContactsCard';
import SearchBar from './TopBar';
import AddButton from './AddButton.js'
import TopBar from './TopBar'

const styles = require('./styles.js')

export default function MyContactsScreen() {
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
    ]

    return (
        <View style={styles.viewStyle}>
            <FlatList
                contentContainerStyle={styles.flatListContainerStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ContactsCard name={item.name} tel={item.tel} email={item.email} received={false} />}
                keyExtractor={(item) => item.id}
                data={data}
                ListHeaderComponent={({item}) => <TopBar />}
                stickyHeaderIndices={[0]}
                />
            <AddButton actions={[{icon: "cellphone-nfc", label: "Kontakt senden"},{icon: "account-plus", label: "Kontakt erstellen"},{icon: "account-multiple-plus", label: "Aus Kontakten importieren"}]}/>
        </View>
    );
}