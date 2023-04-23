import React from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import ReceivedContactsCard from './ReceivedContactsCard';
import SearchBar from './SearchBar';
import AddButton from './AddButton.js'

export default function MyContactsScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <SearchBar/>
            <ReceivedContactsCard/>
            <ReceivedContactsCard/>
            <ReceivedContactsCard/>
            <AddButton/>
        </View>
    );
}