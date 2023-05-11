import { NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, Button } from 'react-native-paper';

import MyNavigator from './MyNavigator';
import { useState } from 'react';
import EditingScreen from './EditingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectContacts from './SelectContacts';


const Stack = createNativeStackNavigator();

export default function App() {
    const [theme, setTheme] = useState({...MD3LightTheme})
    const changeTheme = () => {
        setTheme(theme.dark ? {...MD3LightTheme} : {...MD3DarkTheme})
    }

    return (
        <PaperProvider theme={theme} >
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    <Stack.Screen
                    name="Contacts"
                    children={() => <MyNavigator changeTheme={changeTheme} />}
                    options={{headerShown: false}}
                    />
                    <Stack.Screen
                    name="EditContact"
                    component={EditingScreen}
                    options={{
                        headerStyle: {backgroundColor: theme.colors.background},
                        headerTintColor: theme.colors.onBackground,
                        title: 'Kontakt bearbeiten',
                        headerRight: () => (
                            <Button
                              onPress={() => alert('This is a button!')}
                              mode='contained'>
                                Speichern
                            </Button>
                          ),
                    }}
                    />
                    <Stack.Screen
                    name="CreateContact"
                    component={EditingScreen}
                    options={{
                        headerStyle: {backgroundColor: theme.colors.background},
                        headerTintColor: theme.colors.onBackground,
                        title: 'Kontakt erstellen',
                        headerRight: () => (
                            <Button
                              onPress={() => alert('This is a button!')}
                              mode='contained'>
                                Erstellen
                            </Button>
                          ),
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
