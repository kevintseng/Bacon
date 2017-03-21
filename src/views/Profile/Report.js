import React, { Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import { Radar } from 'react-native-pathjs-charts';
import { observer } from 'mobx-react/native';

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    width,
    height,
  }
};

@observer
export default class Report extends Component {
  render() {
    const data = [{
      "魅力": 68,
      "熱門度": 74,
      "好感度": 79,
      "友好度": 51,
      "活耀度": 49,
    }];

    const options = {
      width: 300,
      height: 300,
      r: 130,
      max: 150,
      fill: "#2980B9",
      stroke: "#2980B9",
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    };

    return(
      <View style={styles.container}>
        <Radar data={data} options={options} />
      </View>
    );
  }
}
