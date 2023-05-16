import React from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, TextInput, useTheme, Button, Text } from 'react-native-paper';

const styles = require('./styles.js')

export default function EditingScreen(props) {
    const theme = useTheme()
    return(
        <View>
            <ScrollView StickyHeaderComponent={<IconButton icon="camera" iconColor={theme.colors.onBackground} size={20}/>}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput label="Vorname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]}/>
                    <TextInput label="Nachname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]}/>
                </View>
                <TextInput label="Telefonnummer" right={<TextInput.Icon icon="phone" />} style={styles.editingInput}/>
                <TextInput label="E-Mail" right={<TextInput.Icon icon="email" />} style={styles.editingInput}/>
                <TextInput label="Adresse" right={<TextInput.Icon icon="map-marker" />} style={styles.editingInput}/>
                <TextInput label="Unternehmen" right={<TextInput.Icon icon="briefcase" />} style={styles.editingInput}/>
                <TextInput label="Website" right={<TextInput.Icon icon="web" />} style={styles.editingInput}/>
                
                {props.editing ? 
                    <Button mode='contained' style={{backgroundColor: theme.colors.error, margin: 10}}>
                        <Text style={{color: theme.colors.onError}}>Kontakt Löschen</Text>
                    </Button>
                    : ''
                }
                
            </ScrollView>
        </View>
    )
}