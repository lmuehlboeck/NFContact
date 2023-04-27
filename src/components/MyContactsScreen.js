import React from 'react';
import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper';
import ContactsCard from './ContactsCard';
import SearchBar from './SearchBar';
import AddButton from './AddButton.js'

const styles = require('./styles.js')

export default function MyContactsScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <SearchBar/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewContainerStyle}>
                <ContactsCard name="Max Mustermann" tel="Tel.: 0670/1234567" email="E-Mail: max@mustermann.at" received={false} />
                <ContactsCard name="Max Mustermann" tel="Tel.: 0670/1234567" email="E-Mail: max@mustermann.at" received={false} />
            </ScrollView>
            <AddButton actions={[{icon: "cellphone-nfc", label: "Kontakt senden"},{icon: "account-plus", label: "Kontakt erstellen"},{icon: "account-multiple-plus", label: "Aus Kontakten importieren"}]}/>
        </View>
    );
}