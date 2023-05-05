'use strict';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

module.exports = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        borderColor: '#FFFFFF',
        width: '40%',
        margin: 0,
    },
    flatListContainerStyle: {
        flexGrow: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '120%',
    },
    modalStyle: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        marginTop: 'auto',
        borderRadius: 15
    },
    portalStyle: {
        flex: 1,
        flexDirection: 'column',
    }
});
