import React from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import MyContactsCard from './MyContactsCard';
import SearchBar from './SearchBar';
import AddButton from './AddButton.js'

export default function MyContactsScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <SearchBar/>
            <MyContactsCard/>
            <MyContactsCard/>
            <AddButton/>
        </View>
    );
}