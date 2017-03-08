import React, {Component, PropTypes} from 'react';
import { View, Dimensions, } from 'react-native';
import { observer } from 'mobx-react/native';
import { Text, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const styles = {
  viewWrapper: {
    width: width,
    height: height,
  }
};

@observer
export default class Account extends Component {
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

  componentDidMount() {
    Reactotron.log('Account rendered');
  }

  render() {
    return(
      <View style={styles.viewWrapper}>
        <Text> Account </Text>
          <Button
            raised
            icon={{name: 'cached'}}
            title='GO TO QUESTION'
            onPress={() => Actions.question()}
            />
      </View>
    );
  }
}
