import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MyNavigator from './MyNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <MyNavigator />
        </NavigationContainer>
    );
}