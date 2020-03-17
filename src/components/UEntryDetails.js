import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { UMetricCard } from './UMetricCard';
import { white } from '../utils/colors';
import { UTextButton } from './UTextButton';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { addEntry } from '../redux/actions';
import { removeEntry } from '../api';
import { useNavigation } from '@react-navigation/native';
export class UEntryDetails extends Component {
  handleReset = () => {
    console.log('called!!!');
    const { remove, goBack, entryId } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }
  render() {
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <UMetricCard metrics={metrics} />
        <UTextButton style={{ padding: 10 }} onPress={this.handleReset}>
          reset
        </UTextButton>
      </View>
    );
  }
}
function mapStateToProps(entries, { route }) {
  const { entryId } = route.params;
  return {
    entries,
    metrics: entries[entryId]
  };
}
function mapDispatchToProps(dispatch, { route }) {
  const { entryId } = route.params;
  const navigation = useNavigation();
  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })
      ),
    goBack: () => navigation.goBack()
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UEntryDetails);
