import * as React from 'react';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import App from './src/App';

export default function Main() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <App />
    </PaperProvider>
  );
}