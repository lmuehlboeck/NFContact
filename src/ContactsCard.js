import React from 'react';
import { Text, Avatar, Button, Card, useTheme } from 'react-native-paper'

const styles = require('./styles.js')

export default function ContactsCard(props) {
    const theme = useTheme()
    return(
        <Card style={{width: '90%', margin: 10}}>
            <Card.Title title={(props.firstname ? props.firstname + ' ' : '') + (props.lastname ? props.lastname : '')} titleStyle={{fontWeight: 'bold'}}/>
            <Card.Content style={{marginBottom: 5}}>
                <Text>Tel.: {props.tel ? props.tel : '-'}</Text>
                <Text variant="bodyMedium">E-Mail: {props.email ? props.email : '-'}</Text>
            </Card.Content>
            <Card.Actions>
                <Button textColor='white' style={styles.buttonStyle} onPress={props.onPressEdit} labelStyle={{color: theme.colors.secondary}} icon={name="pencil"} mode="contained-tonal">
                    <Text style={{color: theme.colors.onBackground, fontWeight: 'bold'}} >Bearbeiten</Text>
                </Button>
                {props.received ?
                    <Button style={styles.buttonStyle} icon={name="export"} mode="contained" onPress={props.onPressExport} labelStyle={{color:theme.colors.background}}>
                        <Text style={{color: theme.colors.background, fontWeight: 'bold'}}>Exportieren</Text>
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