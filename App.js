import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import UAddEntry from './src/components/UAddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { entries } from './src/redux/reducers';
export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(entries)}>
        <View style={styles.container}>
          <UAddEntry />
        </View>
      </Provider>
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
