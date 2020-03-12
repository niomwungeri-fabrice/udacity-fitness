import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from '../utils/helpers';
import { USlider } from './USlider';
import { UStepper } from './UStepper';
import { UDate } from './UDate';
import { Ionicons } from '@expo/vector-icons';
import { UTextButton } from './UTextButton';
import { connect } from 'react-redux';
import { addEntry } from '../redux/actions';
const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Save</Text>
    </TouchableOpacity>
  );
};

class UAddEntry extends Component {
  state = {
    run: 0,
    swim: 0,
    bike: 0,
    eat: 0,
    sleep: 0
  };

  handleSubmit = () => {
    const key = timeToString();
    const entry = this.state;
    // contact/update redux store
    this.props.dispatch(
      addEntry({
        [key]: entry
      })
    );
    this.setState({ run: 0, swim: 0, bike: 0, eat: 0, sleep: 0 });
    // Navigate to home
    // clear local notification
  };

  handleIncrement = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(currState => {
      const count = currState[metric] + step;
      return {
        ...currState,
        [metric]: count > max ? max : count
      };
    });
  };

  handleDecrement = metric => {
    const { step } = getMetricMetaInfo(metric);
    this.setState(currState => {
      const count = currState[metric] - step;
      return {
        ...currState,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  handleSlide = (metric, value) => {
    this.setState({
      [metric]: value
    });
  };

  handleReset = () => {
    const key = timeToString();
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue()
      })
    );
    // Navigate to home
  };
  render() {
    if (this.props.hasLoggedInfo) {
      return (
        <View>
          <Ionicons name={'ios-happy'} size={100} />
          <Text>You have already logged in your info for today</Text>
          <UTextButton onPress={this.handleReset}>reset</UTextButton>
        </View>
      );
    }

    const allMetrics = getMetricMetaInfo();
    return (
      <View>
        <UDate date={new Date().toLocaleDateString()} />
        {Object.keys(allMetrics).map(key => {
          const { getIcon, type, ...rest } = allMetrics[key];
          const value = this.state[key];
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ? (
                <USlider
                  value={value}
                  onChange={value => this.handleSlide(key, value)}
                />
              ) : (
                <UStepper
                  value={value}
                  onIncrement={() => this.handleIncrement(key)}
                  onDecrement={() => this.handleDecrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.handleSubmit} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const key = timeToString();
  return {
    hasLoggedInfo: state && typeof state[key].today === 'undefined'
  };
};

export default connect(mapStateToProps)(UAddEntry);
