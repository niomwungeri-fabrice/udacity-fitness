import React, { Component } from 'react';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

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
import { white, purple } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
});
const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.text}>Save</Text>
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
    this.toHome();
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
    this.toHome();
  };
  toHome = () => {
    const { navigation } = this.props;
    return navigation.dispatch(CommonActions.navigate({ name: 'Add Entry' }));
  };
  render() {
    if (this.props.hasLoggedInfo) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
            size={100}
          />
          <Text>You have already logged in your info for today</Text>
          <UTextButton style={{ padding: 10 }} onPress={this.handleReset}>
            reset
          </UTextButton>
        </View>
      );
    }

    const allMetrics = getMetricMetaInfo();
    return (
      <View style={styles.container}>
        <UDate date={new Date().toLocaleDateString()} />
        {Object.keys(allMetrics).map(key => {
          const { getIcon, type, ...rest } = allMetrics[key];
          const value = this.state[key];
          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider' ? (
                <USlider
                  value={value}
                  onChange={value => this.handleSlide(key, value)}
                  {...rest}
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
    hasLoggedInfo: state[key] && typeof state[key].today === 'undefined'
  };
};

export default connect(mapStateToProps)(UAddEntry);
