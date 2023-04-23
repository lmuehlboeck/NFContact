import React from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyContactsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Meine Kontakte</Text>
            <Icon name='account-group' size={50} color="#000" />
        </View>
    );
}