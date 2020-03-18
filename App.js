import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import entries from './src/redux/reducers';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UAddEntry from './src/components/UAddEntry';
import { purple, white } from './src/utils/colors';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import UHistoryStack from './src/components/UHistoryStack';
import ULive from './src/components/ULive';
import { setLocalNotification } from './src/utils/helpers';

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();
export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(entries)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <Tabs.Navigator
              initialRouteName="UAddEntry"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let icon;
                  if (route.name === 'Add Entry') {
                    icon = (
                      <FontAwesome
                        name="plus-square"
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === 'History') {
                    icon = (
                      <Ionicons
                        name="ios-bookmarks"
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === 'Live') {
                    icon = (
                      <MaterialIcons
                        name="directions-walk"
                        size={size}
                        color={color}
                      />
                    );
                  }
                  return icon;
                }
              })}
              tabBarOptions={{
                activeTintColor: Platform.OS === 'ios' ? purple : white,
                style: {
                  height: 80,
                  backgroundColor: Platform.OS === 'ios' ? white : purple,
                  shadowColor: 'rgba(0, 0, 0, 0.24)',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 6,
                  shadowOpacity: 1
                }
              }}
            >
              <Tabs.Screen name="History" component={UHistoryStack} />
              <Tabs.Screen name="Add Entry" component={UAddEntry} />
              <Tabs.Screen name="Live" component={ULive} />
            </Tabs.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
