import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, TextInput, useTheme, Button, Text } from 'react-native-paper';
import { db } from './Database'

const styles = require('./styles.js')

export default function EditingScreen(props) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')
    const [website, setWebsite] = useState('')

    const theme = useTheme()

    const loadContact = () => {
        db.transaction(txn => {
            txn.executeSql('SELECT * FROM contacts WHERE id=?', [props.contactId], (tx, res) => {
                if(res.rows.length > 0) {
                    const c = res.rows.item(0)
                    setFirstname(c.firstname ? c.firstname : '')
                    setLastname(c.lastname ? c.lastname : '')
                    setTel(c.tel ? c.tel : '')
                    setEmail(c.email ? c.email : '')
                    setAddress(c.address ? c.address : '')
                    setCompany(c.company ? c.company : '')
                    setWebsite(c.website ? c.website : '')
                }
            })
        })
    }
    return(
        <View>
            <ScrollView StickyHeaderComponent={<IconButton icon="camera" iconColor={theme.colors.onBackground} size={20}/>}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput label="Vorname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]} 
                            value={firstname} onChange={setFirstname} />
                    <TextInput label="Nachname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]} 
                            value={lastname} onChange={setLastname} />
                </View>
                <TextInput label="Telefonnummer" right={<TextInput.Icon icon="phone" />} style={styles.editingInput} 
                            value={tel} onChange={setTel} />
                <TextInput label="E-Mail" right={<TextInput.Icon icon="email" />} style={styles.editingInput} 
                            value={email} onChange={setEmail} />
                <TextInput label="Adresse" right={<TextInput.Icon icon="map-marker" />} style={styles.editingInput} 
                            value={address} onChange={setAddress} />
                <TextInput label="Unternehmen" right={<TextInput.Icon icon="briefcase" />} style={styles.editingInput} 
                            value={company} onChange={setCompany} />
                <TextInput label="Website" right={<TextInput.Icon icon="web" />} style={styles.editingInput} 
                            value={website} onChange={setWebsite} />
                
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