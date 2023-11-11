import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, useWindowDimensions, useColorScheme, StatusBar, Switch } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); // removes uncaught (yellow) warnings. Will still show red warnings.

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    paddingTop: 40,
    padding: 8,

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#007AFF',


  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
    minWidth: 300,
    margin: 10,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
  },

  textfield: {
    margin: 8,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 10,
    backgroundColor: "lightgray",
    height: 35,
    textAlign: 'left',
    maxWidth: 600,
    minWidth: 300,
    alignSelf: 'center',
  },

  picker: {
    marginVertical: 0,
    height: 120,
    width: 300,
    overflow: 'visible',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    textAlign: 'right',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    numberOfLines: 3,

  },
  pickerItemStyle: {

    maxHeight: "100%",
    fontWeight: 'normal',
    width: "100%",
    flexWrap: 'wrap',
    textAlign: 'justify',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    numberOfLines: 3,
  }

});