import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEntry from './src/components/AddEntry';

export default class App extends Component {
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
