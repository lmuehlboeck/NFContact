import React from 'react';
import { ScrollView, View, VirtualizedList } from 'react-native'
import { } from 'react-native-paper';
import ContactsCard from './ContactsCard';
import SearchBar from './SearchBar';
import AddButton from './AddButton.js'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const styles = require('./styles.js')

export default function RecievedContactsScreen() {
    const getItem = (_data, index) => ({
        id: index,
        name: "Max Mustermann",
        tel: "Tel.: 0670/1234567",
        email: "E-Mail: max@mustermann.at"
    })
    const getItemCount = _data => 20
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <SearchBar/>
            <VirtualizedList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewContainerStyle}
                renderItem={({item}) => <ContactsCard name={item.name} tel={item.tel} email={item.email} received={true} />}
                keyExtractor={(item) => item.id}
                getItem={getItem}
                getItemCount={getItemCount}
                />
            <AddButton actions={[{icon: "cellphone-nfc", label: "Kontakt empfangen"},{icon: "trash-can-outline", label: "Mehrere Kontakte löschen"},{icon: "import", label: "Mehrere Kontakte importieren"}]}/>
        </View>
    );
}