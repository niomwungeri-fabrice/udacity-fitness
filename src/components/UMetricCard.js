import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';
import { UDate } from './UDate';

export const UMetricCard = ({ date, metrics }) => {
  return (
    <View>
      {date && <UDate date={date} />}
      {Object.keys(metrics).map(metric => {
        const { getIcon, displayName, unit } = getMetricMetaInfo(metric);
        return (
          <View style={styles.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{ fontSize: 20 }}>{displayName}</Text>
              <Text style={{ fontSize: 16, color: gray }}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  }
});
