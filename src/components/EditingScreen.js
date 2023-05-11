import React from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';

const styles = require('./styles.js')

export default function EditingScreen(props) {
    const theme = useTheme()
    return(
        <View>
            <ScrollView StickyHeaderComponent={<IconButton icon="camera" iconColor={theme.colors.onBackground} size={20}/>}>
                <TextInput label="Vorname"/>
                <TextInput label="Nachname"/>
                <TextInput label="Telefonnummer"/>
                <TextInput label="E-Mail"/>
                <TextInput label="Adresse"/>
                <TextInput label="Unternehmen"/>
                <TextInput label="Website"/>
            </ScrollView>
        </View>
    )
}