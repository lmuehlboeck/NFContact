import React, { useState } from 'react';
import { View } from 'react-native';
import { Searchbar, IconButton, useTheme } from 'react-native-paper';

export default function TopBar(props) {
  const theme = useTheme()
  const [modeIcon, setModeIcon] = useState('weather-night')

  return(
      <View style={{flexGrow:1, flexDirection: 'row',height: 60, margin: 10, marginBottom: 0, backgroundColor: '#00'}}>
          <SearchBar/>
          <IconButton
          mode='contained'
          icon={modeIcon}
          iconColor={theme.colors.background}
          size={20}
          onPress={() => {props.changeTheme(); setModeIcon(modeIcon == 'weather-night' ? 'weather-sunny' : 'weather-night')}}
          style={{width: 60, height: 60, alignSelf: 'center', backgroundColor: theme.colors.primary}}
          />
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

