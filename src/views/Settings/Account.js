import React, {Component, PropTypes} from 'react';
//import {View, Dimensions, StyleSheet, ListView, Modal} from 'react-native';
import {
  Alert,
  View,
  Image,
  Modal,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  UIExplorerBlock,
} from 'react-native';
import { observer } from 'mobx-react/native';
import { Text, Button,ListItem,SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

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
      show:false
    };
  }


  componentDidMount() {
    Reactotron.log('Account rendered');
  }

  render() {
    return(
      <View>
        <Button
          backgroundColor='#007AFF'
          //color='#007AFF'
          buttonStyle={styles.buttonTop}
          onPress={()=> {Actions.changepassword()}}
          title='變更密碼' />
        <Button
          backgroundColor='transparent'
          color='#666666'
          fontSize={12}
          style={{ marginTop: 10 }}
          title='刪除帳號' />
      </View>
    );
  }
}

const styles = {
  buttonTop: {
    marginTop: 20
  },

  wrapper: {
   borderRadius: 5,
   marginBottom: 5,
 },
 button: {
   backgroundColor: '#eeeeee',
   padding: 10,
 },
}
