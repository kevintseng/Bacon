import React, {Component, PropTypes} from 'react';
import { View, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, Text, ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export default class Profile extends Component {
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
    Reactotron.log('Rendering Profile');
    Actions.refresh({ key: 'drawer', open: false });
    let user = this.fs.auth().currentUser;

    Reactotron.debug(this.store.user);
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
          title='Test Profile'
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
    subtitleView: {
      paddingTop: 0,
      marginTop: 0
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    },
    viewWrapper: {
      width: width,
      height: height,
    }
  }
