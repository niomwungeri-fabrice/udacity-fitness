import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchCalendarResults } from '../api';
import { receiveEntries, addEntry } from '../redux/actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/colors';
import { UDate } from './UDate';
import { UMetricCard } from './UMetricCard';
import { AppLoading } from 'expo';
class UHistory extends Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue()
            })
          );
        }
      })
      .then(() => this.setState(() => ({ ready: true })));
  }
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <View>
          <UDate date={formattedDate} />
          <Text style={styles.noDataText}>{today}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => console.log('Pressed!')}>
          <UMetricCard date={formattedDate} metrics={metrics} />
        </TouchableOpacity>
      )}
    </View>
  );
  renderEmptyDate(formattedDate) {
    return (
      <View>
        <View style={styles.item}>
          <UDate date={formattedDate} />
          <Text style={styles.noDataText}>
            You didn't log any data on this day.
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const { entries } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});
const mapStateToProps = entries => ({ entries });

export default connect(mapStateToProps)(UHistory);
