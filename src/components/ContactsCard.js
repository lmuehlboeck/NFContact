import React from 'react';
import { Text, Avatar, Button, Card, useTheme } from 'react-native-paper';
import { EditingScreen } from './EditingScreen.js';

const styles = require('./styles.js')

export default function ContactsCard(props) {
    const theme = useTheme()
    return(
        <Card style={{width: '90%', margin: 10}}>
            <Card.Title title={props.name} titleStyle={{fontWeight: 'bold'}}/>
            <Card.Content style={{marginBottom: 5}}>
                <Text>{props.tel}</Text>
                <Text variant="bodyMedium">{props.email}</Text>
            </Card.Content>
            <Card.Actions>
                {props.received ? 
                    <Button textColor='black' style={styles.buttonStyle} icon={"pencil"} mode="contained-tonal" labelStyle={{color:theme.colors.onBackground}}>
                        <Text style={{color:theme.colors.onBackground, fontWeight: 'bold'}}>Exportieren</Text>
                    </Button>
                    :
                    <Button textColor='white' style={styles.buttonStyle} onPress={props.editButtonPress} labelStyle={{color: theme.colors.secondary}} icon={name="pencil"} mode="contained-tonal">
                        <Text style={{color: theme.colors.onBackground, fontWeight: 'bold'}} >Bearbeiten</Text>
                    </Button>
                }
                {props.received ?
                    <Button style={styles.buttonStyle} icon={name="trash-can-outline"} mode="contained" labelStyle={{color:theme.colors.background}}>
                        <Text style={{color: theme.colors.background, fontWeight: 'bold'}}>Löschen</Text>
                    </Button>
                    :
                    <Button style={styles.buttonStyle} icon={name="send"} mode="contained" onPress={props.onPressSend} labelStyle={{color:theme.colors.background}}>
                        <Text style={{color: theme.colors.background, fontWeight: 'bold'}}>Senden</Text>
                    </Button>
                }
            </Card.Actions>
        </Card>
    );
}