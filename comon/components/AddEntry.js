import React, { Component } from "react";
import { View } from "react-native";
import { getMetricMetaInfo } from "../../src/utils/helpers";

export default class AddEntry extends Component {
  render() {
    return <View>{getMetricMetaInfo("bike").getIcon}</View>;
  }
}
