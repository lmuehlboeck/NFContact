import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Alert, ImageProps, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconElement, Icon, Spinner, IconRegistry, Layout, styled, Text, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const { Navigator, Screen } = createBottomTabNavigator();

const PersonAddOutlineIcon = (props): IconElement => (
  <Icon
    {...props}
    name='person-add-outline'
  />
);

const PeopleOutlineIcon = (props): IconElement => (
  <Icon
    {...props}
    name='people-outline'
  />
);

const ReceivedContactsScreen = () => (
  <Layout style={{ flex: 1, height:0.078*windowHeight, justifyContent: 'center', alignItems: 'center' }}>
    <Icon
      style={styles.icon}
      name='person-add-outline'
      fill='#000000'
    />
    <Text category='h1'>Empfangene Kontakte</Text>
  </Layout>
);

const MyContactsScreen = () => (
  <Layout style={{ flex: 1, height:0.078*windowHeight, justifyContent: 'center', alignItems: 'center' }}>
    <Icon
      style={styles.icon}
      name='people-outline'
      fill='#000000'
    />
    <Text category='h1'>Eigene Kontakte</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation style={styles.bottomNavigation}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Eigene Kontakte' icon={PeopleOutlineIcon}/>
    <BottomNavigationTab title='Empfangene Kontakte' icon={PersonAddOutlineIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Eigene Kontakte' component={MyContactsScreen}/>
    <Screen name='Empfangene Kontakte' component={ReceivedContactsScreen}/>
  </Navigator>
);


const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <IconRegistry icons={EvaIconsPack}/>
    <Text category='h1'>HOME</Text>
    <AppNavigator />
  </Layout>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={{ flex: 1, height:0.078*windowHeight}}>
        <AppNavigator/>
      </Layout>
    </ApplicationProvider>
  </>
);

const styles = StyleSheet.create({
  icon:{
    width: 32,
    height: 32,
  },
  bottomNavigation: {
    paddingBottom: 0,
  }
});



NfcManager.start();
let session: HCESession;


function App() {
  const [data, setData] = useState('Drip Narix')

  async function sendData() { 
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: data,
      writable: false
    });
    console.log(`'${data}' wird gesendet`)
  
    session = await HCESession.getInstance();
    session.setApplication(tag);
    await session.setEnabled(true).catch((err) => console.log(err));
  }

  async function stopSending() {
    if(session)
       await session.setEnabled(false)
  }

  async function readNdef() {
    stopSending()
    NfcManager.requestTechnology(NfcTech.Ndef)
      .then(() => NfcManager.getTag())
      .then(tag => {
        console.log(tag)
        if(tag) {
          let text = String.fromCharCode(...tag.ndefMessage[0].payload)
          console.log(text)
          Alert.alert("Text empfangen", text)
        }
      })
      .catch(err => {
        console.warn(err)
      })
      .then(() => {NfcManager.cancelTechnologyRequest()})
  }






  /**
  return (

    






    
    <View style={styles.container}>
      <Text>Text zum Senden eingeben:</Text>
      <TextInput style={styles.input} onChangeText={(val) => setData(val)} />
      <View style={styles.buttonContainer}>
        <Button title='Senden' onPress={sendData} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Empfangen' onPress={readNdef} />
      </View>
    </View>
   
  );
  */
}



























/**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 5
  },
  input: {
    width: 200,
    padding: 8,
    margin: 20,
    borderWidth: 2,
    borderColor: 'blue',
    color: 'black' 
  }
});
*/

