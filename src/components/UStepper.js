import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
export const UStepper = ({
  max,
  unit,
  step,
  value,
  onIncrement,
  onDecrement
}) => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            onPress={onIncrement}
            name="plus"
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};
