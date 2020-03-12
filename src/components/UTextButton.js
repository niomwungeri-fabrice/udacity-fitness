import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
export const UTextButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
