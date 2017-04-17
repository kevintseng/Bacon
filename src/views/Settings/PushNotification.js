import React, {Component, PropTypes} from 'react';
import { View, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, Text, ListItem } from 'react-native-elements';


const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export default class PushNotification extends Component {
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
      tip: null,
    };
  }

  componentWillMount() {
    console.log('Rendering Profile');
    Actions.refresh({ key: 'drawer', open: false });
    let user = this.fs.auth().currentUser;

    console.debug(this.store.user);
  }

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  render() {
    const user = this.store.user;
    const userImg = {uri: user.photoURL};
    const emailVerified = user.emailVerified ? {name: 'beenhere', color: 'skyblue'} : {name: 'report', color: 'orange'};

    return(
      <View style={styles.viewWrapper}>
        <Card
          title={user.displayName}
          containerStyle={{ flex: 1, width: this.state.size.width, margin: 0 }}
          wrapperStyle={{flex: 1}}
          image={userImg}
          >
          <ListItem
            key={user.email}
            title='Email'
            subtitle={user.email}
            rightTitle={this.state.tip}
            rightIcon={emailVerified}
            onPress={this.emailPressed}
            />


        </Card>
      </View>
    );
  }
}

const styles = {
  viewWrapper: {
    width: width,
    height: height,
  }
};
