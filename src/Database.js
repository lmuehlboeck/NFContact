import { openDatabase } from 'react-native-sqlite-storage';

export const db = openDatabase(
    {
        name: 'MainDB',
        location: 'default'
    },
    () => {},
    err => console.log(err)
)