import React, { useEffect, useState } from 'react';
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
                    console.log(c)
                    setFirstname(c.firstname ? c.firstname : '')
                    setLastname(c.lastname ? c.lastname : '')
                    setTel(c.tel ? c.tel : '')
                    setEmail(c.email ? c.email : '')
                    setAddress(c.address ? c.address : '')
                    setCompany(c.company ? c.company : '')
                    setWebsite(c.website ? c.website : '')
                }
            }, err => console.log(err))
        })
    }

    useEffect(() => {
        loadContact()
        console.log('List')
    }, [])

    return(
        <View>
            <ScrollView StickyHeaderComponent={<IconButton icon="camera" iconColor={theme.colors.onBackground} size={20}/>}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput label="Vorname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]} 
                            value={firstname} onChangeText={text => setFirstname(text)} />
                    <TextInput label="Nachname" right={<TextInput.Icon icon="account" />} style={[styles.editingInput, styles.nameInput]} 
                            value={lastname} onChangeText={text => setLastname(text)} />
                </View>
                <TextInput label="Telefonnummer" right={<TextInput.Icon icon="phone" />} style={styles.editingInput} 
                            value={tel} onChangeText={text => setTel(text)} />
                <TextInput label="E-Mail" right={<TextInput.Icon icon="email" />} style={styles.editingInput} 
                            value={email} onChangeText={text => setEmail(text)} />
                <TextInput label="Adresse" right={<TextInput.Icon icon="map-marker" />} style={styles.editingInput} 
                            value={address} onChangeText={text => setAddress(text)} />
                <TextInput label="Unternehmen" right={<TextInput.Icon icon="briefcase" />} style={styles.editingInput} 
                            value={company} onChangeText={text => setCompany(text)} />
                <TextInput label="Website" right={<TextInput.Icon icon="web" />} style={styles.editingInput} 
                            value={website} onChangeText={text => setWebsite(text)} />
                
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