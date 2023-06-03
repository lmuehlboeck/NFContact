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
        width: '120%',
        overflow: 'hidden'
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
    },
    h1: {
        fontWeight: 'bold',
    },
    editingInput: {
        flex: 1,
        margin: 10
    },
    nameInput: {
        width: '50%'
    }
});
