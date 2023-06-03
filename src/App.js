import { NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, Button } from 'react-native-paper';

import MyNavigator from './MyNavigator';
import { useEffect, useState } from 'react';
import EditingScreen from './EditingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectContacts from './SelectContacts';
import { db } from './Database'


const Stack = createNativeStackNavigator();

export default function App() {
    const [editingContactId, setEditingContactId] = useState(0)
    const [theme, setTheme] = useState({...MD3LightTheme})
    const changeTheme = () => {
        setTheme(theme.dark ? {...MD3LightTheme} : {...MD3DarkTheme})
    }

    useEffect(() => {
        db.transaction(txn => {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY NOT NULL,received INTEGER NOT NULL,firstname TEXT,lastname TEXT,tel TEXT,email TEXT,address TEXT,company TEXT,website TEXT)'
            )
        })
    })

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator id="Screens">
                    <Stack.Screen
                    name="Contacts"
                    children={() => <MyNavigator changeTheme={changeTheme} changeEditingContact={id => setEditingContactId(id)} />}
                    options={{headerShown: false}}
                    />
                    <Stack.Screen
                    name="EditContact"
                    children={() => <EditingScreen editing={true} contactId={editingContactId} />}
                    options={{
                        headerStyle: {backgroundColor: theme.colors.background}, 
                        headerTintColor: theme.colors.onBackground,
                        title: 'Kontakt bearbeiten'
                    }}
                    />
                    <Stack.Screen
                    name="CreateContact"
                    children={() => <EditingScreen />}
                    options={{
                        headerStyle: {backgroundColor: theme.colors.background},
                        headerTintColor: theme.colors.onBackground,
                        title: 'Kontakt erstellen'
                    }}
                    />
                    <Stack.Screen
                    name="DeleteContacts"
                    component={SelectContacts}
                    options={{
                        headerStyle: {backgroundColor: theme.colors.background},
                        headerTintColor: theme.colors.onBackground,
                        title: 'Kontakte löschen',
                        headerRight: () => (
                            <Button
                              onPress={() => alert('This is a button!')}
                              mode='contained'>
                                Löschen
                            </Button>
                          ),
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
        
    );
}
