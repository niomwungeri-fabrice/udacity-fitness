import React, { Component } from 'react';
import { View } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { Slider } from './Slider';
import { Stepper } from './Stepper';

export default class AddEntry extends Component {
  state = {
    run: 0,
    swim: 0,
    bike: 0,
    eat: 0,
    sleep: 0
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(currState => {
      const count = currState[metric] + step;
      return {
        ...currState,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);
    this.setState(currState => {
      const count = currState[metric] - step;
      return {
        ...currState,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    });
  };
  render() {
    return (
      <View>
        <Slider />
        <Stepper />
      </View>
    );
  }
}
