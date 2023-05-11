import { NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import MyNavigator from './MyNavigator';
import { useState } from 'react';
import EditingScreen from './EditingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyContactsScreen from './MyContactsScreen';
import { PropsService } from '@ui-kitten/components/devsupport';

export function changeTheme() {
    if(theme.dark) {
        theme={...MD3LightTheme}
        console.log("changed to light")
    } else {
        theme={...MD3DarkTheme}
        console.log("changed to dark")
    }
}

const Stack = createNativeStackNavigator();

export default function App() {
    const [theme, setTheme] = useState({...MD3LightTheme})
    const changeTheme = () => {
        setTheme(theme.dark ? {...MD3LightTheme} : {...MD3DarkTheme})
    }

    return (
        <PaperProvider theme={theme} >
            {/** <NavigationContainer theme={theme}>
                <MyNavigator changeTheme={changeTheme} />
            </NavigationContainer> */}
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
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
        
    );
}
