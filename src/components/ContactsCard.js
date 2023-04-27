import React from 'react';
import { Text, Avatar, Button, Card } from 'react-native-paper';

const styles = require('./styles.js')

export default function ContactsCard(props) {
    return(
        <Card style={{width: '90%', margin: 10}}>
            <Card.Title title={props.name} titleStyle={{fontWeight: 'bold'}}/>
            <Card.Content style={{marginBottom: 5}}>
                <Text>{props.tel}</Text>
                <Text variant="bodyMedium">{props.email}</Text>
            </Card.Content>
            <Card.Actions>
                {props.received ? 
                    <Button textColor='black' style={styles.buttonStyle} icon={name="pencil"} mode="contained-tonal">
                        <Text style={{color:'black', fontWeight: 'bold'}}>Exportieren</Text>
                    </Button>
                    :
                    <Button textColor='white' style={styles.buttonStyle} labelStyle={{color: "black"}} icon={name="pencil"} mode="contained-tonal">
                        <Text style={{color:'black', fontWeight: 'bold'}} >Bearbeiten</Text>
                    </Button>
                }
                {props.received ?
                    <Button style={styles.buttonStyle} icon={name="trash-can-outline"} mode="contained">
                        <Text style={{color:'white', fontWeight: 'bold'}}>Löschen</Text>
                    </Button>
                    :
                    <Button style={styles.buttonStyle} icon={name="send"} mode="contained">
                        <Text style={{color:'white', fontWeight: 'bold'}}>Senden</Text>
                    </Button>
                }
            </Card.Actions>
        </Card>
    );
}