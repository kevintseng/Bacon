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
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
  }

  render() {
    const defaultData = { charm:50, popularity:50, likeness:50, friendliness:50, activity:50 };
    const { charm, popularity, likeness, friendliness, activity } = this.store.user.analysis ? this.store.user.analysis : defaultData;
    const data = [{
      "魅力值": charm,
      "熱門度": popularity,
      "好感度": likeness,
      "友好度": friendliness,
      "活耀度": activity,
    }];

    const options = {
      width,
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
