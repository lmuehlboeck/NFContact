import React from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, IconButton, Text, TextInput, ThemeProvider, useTheme } from 'react-native-paper';

const styles = require('./styles.js')

export default function EditingScreen(props) {
    const theme = useTheme()
    return(
        <View>
            <Text style={styles.h1}>{props.firstname} {props.lastname}</Text>
            <ScrollView StickyHeaderComponent={<IconButton icon="camera" iconColor={theme.colors.onBackground} size={20}/>}>
                <TextInput label="Vorname"/>
                <TextInput label="Nachname"/>
                <TextInput label="Label (optional)"/>
                <TextInput label="Telefonnummer"/>
                <TextInput label="Label (optional)"/>
                <TextInput label="E-Mail"/>
                <TextInput label="Label (optional)"/>
                <TextInput label="Adresse (optional)"/>
                <TextInput label="U1nternehmen (optional)"/>
                <TextInput label="Website (optional)"/>
            </ScrollView>
        </View>
    )
}