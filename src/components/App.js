import { NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import MyNavigator from './MyNavigator';

export function changeTheme() {
    if(theme.dark) {
        theme={...MD3LightTheme}
        console.log("changed to light")
    } else {
        theme={...MD3DarkTheme}
        console.log("changed to dark")
    }
}

var theme = {
    ...MD3DarkTheme
}

export default function App() {
    return (
        <PaperProvider theme={theme} >
            <NavigationContainer theme={theme}>
                <MyNavigator />
            </NavigationContainer>
        </PaperProvider>
        
    );
}
