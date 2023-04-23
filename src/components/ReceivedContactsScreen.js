import React from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ReceivedContactsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Empfangene Kontakte</Text>
            <Icon name='account-plus' size={50} color="#000" />
        </View>
    );
}