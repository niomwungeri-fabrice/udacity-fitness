import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UAddEntry from './src/components/UAddEntry';

export default class App extends Component {
  state = {
    value: 0
  };
  handleValueChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <View style={styles.container}>
        <UAddEntry />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
