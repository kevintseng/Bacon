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
  AsyncStorage,
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


  deleteAccount = async() => {
    let user = this.fs.auth().currentUser;

    user.delete().then(function() {
      try{
      AsyncStorage.getItem('@HookupStore:user').then( user => {
        if(user != null) {
          AsyncStorage.removeItem('@HookupStore:user').then(() => {
            console.log('in fun');
            this.store.signOut();
            Actions.sessioncheck({type: 'reset'});
          }).catch(err => {
            Reactotron.error('Delete local storage user data error: ');
            Reactotron.error(err);
          });
        } else {
          this.store.signOut();
          Actions.sessioncheck({type: 'reset'});
        }
      }).catch(err => {
        Reactotron.error('Get local storage user data error: ');
        Reactotron.error(err);
      });
      } catch (error) {
        Reactotron.error('Firebase signout error: ');
        Reactotron.error(error);
      };
    }, function(error) {
      // An error happened.
    });






};

 checkin(){
   console.log('in checkfun');
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
          title='刪除帳號'
          onPress={() => Alert.alert(
            '刪除帳號',
            '帳號刪除後，將無法恢復。請確認是否刪除',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: this.deleteAccount},
            ]
          )}/>
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
