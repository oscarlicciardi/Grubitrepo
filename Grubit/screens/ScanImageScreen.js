/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import type { PropsWithChildren } from 'react';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, ScrollView, useColorScheme, LogBox } from 'react-native';




function ScanImageScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState('');
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (

    <ScrollView>
      <Text style={{ alignSelf: 'center', color: isDarkMode ? '#FFF' : '#000', margin: 10, marginTop: 50 }}>{'\n'}Take a picture</Text>

      <Camera
        style={{ width: '100%', height: '200%' }}
        type={type}>
      </Camera>

      <TouchableOpacity
        style={{ margin: 10, marginTop: 50, marginBottom: 30, padding: 15, borderRadius: 15, backgroundColor: '#007AFF', width: 150, alignSelf: 'center', }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Add</Text>
      </TouchableOpacity>

    </ScrollView >

  );
}

export default ScanImageScreen;

/*

import React from 'react';
import AppNavigator from './navigator/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

export default App;

*/