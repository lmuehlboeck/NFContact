import React from 'react';
import { FlatList, View, Alert } from 'react-native'
import ContactsCard from './ContactsCard';
import AddButton from './AddButton.js'
import TopBar from './TopBar';

const styles = require('./styles.js')

export default function RecievedContactsScreen(props) {
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
        }
    ]
    return (
        <View style={styles.viewStyle}>
            <TopBar changeTheme={props.changeTheme}/>
            <FlatList
                contentContainerStyle={styles.flatListContainerStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ContactsCard name={item.name} tel={item.tel} email={item.email} received={true} />}
                keyExtractor={(item) => item.id}
                data={data}
                />
            <AddButton actions={[
                {icon: "cellphone-nfc", label: "Kontakt empfangen", onPress: () => Alert.alert('Achtung!', 'Work in progress')},
                {icon: "trash-can-outline", label: "Mehrere Kontakte löschen", onPress: props.navigateDelete},
                {icon: "import", label: "Mehrere Kontakte importieren", onPress: () => Alert.alert('Achtung!', 'Work in progress')}
            ]}/>
        </View>
    );
}