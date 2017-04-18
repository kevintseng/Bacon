import React, {Component, PropTypes} from 'react';
import { Platform, StyleSheet, View, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { List, ListItem } from 'react-native-elements';
import Moment from 'moment';


const {width, height} = Dimensions.get('window'); //eslint-disable-line
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
];

@observer
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height
      },
      chatrooms: [],
      isLoading: false,
    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug('Rendering Messages');
    Actions.refresh({ key: 'drawer', open: false });
    this._isMounted = false;

  }

  componentDidMount() {
    this._isMounted = true;

  }

  render() {
    return(
      <List containerStyle={{marginBottom: 20, marginTop: 5 }}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={{uri:l.avatar_url}}
              key={i}
              title={l.name}
              onPress={() => { Actions.chat() }} 
            />
          ))
        }
      </List>
    );
  }
}
