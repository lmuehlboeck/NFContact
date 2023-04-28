import * as React from 'react';
import { View } from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={{flexGrow: 1, paddingTop: 10, backgroundColor: 'transparent'}}>
      <Searchbar
        placeholder="Suchen"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{width: '95%'}}
      />
    </View>
  );
};