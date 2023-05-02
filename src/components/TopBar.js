import React from 'react';
import { View } from 'react-native';
import { Searchbar, IconButton, useTheme } from 'react-native-paper';
import { changeTheme } from './App';

export default function TopBar() {

    return(
        <View style={{flexGrow:1, flexDirection: 'row',height: 60, margin: 10, marginBottom: 0, backgroundColor: '#00'}}>
            <SearchBar/>
            <ThemeButton/>
        </View>
    )
}

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder='Suchen'
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{flex:1, alignSelf: 'center'}}
      />
    );
  };

const ThemeButton = () => {
    const theme=useTheme()
    return(
      <IconButton
      mode='contained'
      icon='weather-night'
      iconColor={theme.colors.background}
      size={20}
      onPress={() => changeTheme()}
      style={{width: 60, height: 60, alignSelf: 'center', backgroundColor: theme.colors.primary}}
      />
    )
    
  };

