import React, {Component, PropTypes} from 'react';
import { View, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import { Text } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export default class Settings extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height
      },
    };
  }

  componentWillMount() {
    Actions.refresh({ key: 'drawer', open: false });
  }

  render() {
    autorun(() => {
      Reactotron.log(this.state);
    });
    return(
      <View style={this.state.size}>

        <Text> hi </Text>
      </View>
    );
  }
}
