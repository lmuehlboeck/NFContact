import React, { useState } from 'react';
import { useTheme, Checkbox, Text, TouchableRipple } from 'react-native-paper';
import { FlatList, View } from 'react-native';

const styles = require('./styles')

export default function SelectContacts(props) {
    const data = [
        {
            id: 1,
            firstname: 'Max',
            lastname: 'Mizrak'
        },
        {
            id: 2,
            firstname: 'Nathen',
            lastname: 'Ribinin'
        }
    ]

    return (
        <FlatList
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <ContactEntry firstname={item.firstname} lastname={item.lastname} />}
            keyExtractor={(item) => item.id}
            data={data}
            />
    )
}

export function ContactEntry(props) {
    const theme = useTheme()
    const [selected, setSelected] = useState(false)

    return(
        <TouchableRipple
            onPress={() => selected ? setSelected(false) : setSelected(true)}
            rippleColor={theme.colors.secondaryContainer}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomColor: theme.colors.surfaceVariant, borderBottomWidth: 1, marginHorizontal: 5}}>
                    <Text style={{fontSize: 18}}>{props.firstname} {props.lastname}</Text>
                    <Checkbox status={selected ? 'checked' : 'unchecked'} />
                </View>
        </TouchableRipple>
    )
}