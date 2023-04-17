import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';


NfcManager.start();
let session: HCESession;


export default function App() {
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
}

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
