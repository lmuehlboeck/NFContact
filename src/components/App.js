import { NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import MyNavigator from './MyNavigator';
import { useState } from 'react';

export function changeTheme() {
    if(theme.dark) {
        theme={...MD3LightTheme}
        console.log("changed to light")
    } else {
        theme={...MD3DarkTheme}
        console.log("changed to dark")
    }
}

export default function App() {
    const [theme, setTheme] = useState({...MD3LightTheme})
    const changeTheme = () => {
        setTheme(theme.dark ? {...MD3LightTheme} : {...MD3DarkTheme})
    }

    return (
        <PaperProvider theme={theme} >
            <NavigationContainer theme={theme}>
                <MyNavigator changeTheme={changeTheme} />
            </NavigationContainer>
        </PaperProvider>
        
    );
}
