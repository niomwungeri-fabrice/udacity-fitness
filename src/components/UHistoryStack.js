import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UHistory from './UHistory';
import EntryDetails from './UEntryDetails';
import { white } from '../utils/colors';

const Stack = createStackNavigator();

const UHistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: white
        }
      }}
    >
      <Stack.Screen name="History" component={UHistory} />
      <Stack.Screen
        name="Details"
        component={EntryDetails}
        options={({ route }) => {
          const { entryId } = route.params;
          return {
            title: entryId
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default UHistoryStack;
