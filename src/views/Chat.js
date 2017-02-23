import React, {Component, PropTypes} from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import { Text } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export class Chat extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.appstore = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height
      },
    };
  }

  render() {
    autorun(() => {
      Reactotron.log(this.state);
    });
    return(
      <View style={this.state.size}>
        <Header
          headerText='建立新帳號'
          rightButtonText='下一步'
          onRight={this.handleSubmit}
          rightColor='#007AFF'
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        <Text> hi </Text>
      </View>
    );
  }
}
