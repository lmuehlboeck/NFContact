import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{width: '95%', margin:10}}
    />
  );
};