import React from 'react';
import { Text, Avatar, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = require('./styles.js')

export default function MyContactsCard() {
    return(
        <Card style={{width: '90%', margin: 10}}>
            <Card.Title title="Max Mustermann" subtitle="Tel.: 0670/1234567"/>
            <Card.Content>
                <Text variant="bodyMedium">Email: max@mustermann.at</Text>
            </Card.Content>
            <Card.Actions>
                <Button buttonColor='#0D6EFD' textColor='white' style={styles.buttonStyle}>
                    <Icon name='pencil' color='white' size={20}/>
                    <Text style={{color:'white', fontWeight: 'bold'}} >Bearbeiten</Text>
                </Button>
                <Button buttonColor='red' style={styles.buttonStyle}>
                    <Icon name="trash-can-outline" color='white' size={20}/>
                    <Text style={{color:'white', fontWeight: 'bold'}}>Löschen</Text>
                </Button>
            </Card.Actions>
        </Card>
    );
}