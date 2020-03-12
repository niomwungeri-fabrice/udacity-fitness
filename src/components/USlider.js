import React from 'react';
import { View, Text, Slider } from 'react-native';

export const USlider = props => {
  const { max, unit, step, value, onChange } = props;
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      ></Slider>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};
