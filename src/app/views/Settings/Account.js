import React, {Component, PropTypes} from 'react';
import {
  Alert,
  View,
  Image,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  UIExplorerBlock,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { observer } from 'mobx-react/native';
import { Text, Button,ListItem,SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';

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
    this.db = this.props.localdb;
    this.state = {
      visibleModal: null,
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
            console.error('Delete local storage user data error: ');
            console.error(err);
          });
        } else {
          this.store.signOut();
          Actions.sessioncheck({type: 'reset'});
        }
      }).catch(err => {
        console.error('Get local storage user data error: ');
        console.error(err);
      });
      } catch (error) {
        console.error('Firebase signout error: ');
        console.error(error);
      };
    }, function(error) {
      // An error happened.
    });
  };

  signOut = () => {
    if(this.store.user) {
      this.setOffline(this.store.user.uid);
      this.store.signOut();
    }
    // Sign out from firebase
    this.fs.auth().signOut();
    // Clear out local database's user data
    this.db.remove({
      key: 'user',
    });
    //this.setState({ visibleModal: null });
    // Render SessionCheck and redirect to signin view
    Actions.sessioncheck({type: 'reset'});
  }

  setOffline(uid) {
    // const timestamp = Math.floor(Date.now() / 1000);
    this.fs.database().ref('/online/' + uid).remove();
  }

  componentDidMount() {
    console.log('Account rendered');
  }

  _renderConfirmButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  )

  _renderSignOutContent = () => (
    <View style={styles.modalContent}>
      <View style={{justifyContent: 'center',alignItems: 'center',height: height*0.1}}>
        <Text>確定登出？</Text>
      </View>
      {this._renderConfirmButton('確定', () => this.signOut())}
    </View>
  );

  _renderDeleteAccountContent = () => (
    <View style={styles.modalContent}>
      <View style={{justifyContent: 'center',alignItems: 'center',height: height*0.15}}>
        <Text>帳號刪除後將無法復原，</Text>
        <Text>相關內容也將會刪除哦</Text>
        <Text style={{marginTop:10}}>確定刪除？</Text>
      </View>
      {this._renderConfirmButton('確定', () => this.deleteAccount())}
    </View>
  );

  /*
    <Button
      backgroundColor='transparent'
      color='#666666'
      fontSize={12}
      style={{textDecorationLine:'underline'}}
      title='刪除帳號'
      onPress={() => Alert.alert(
        '刪除帳號',
        '帳號刪除後，將無法恢復。請確認是否刪除',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: this.deleteAccount},
        ]
      )}/>
      */


  render() {
    return(
      <View style={styles.container}>
        <View>
          <Button
            backgroundColor='#007AFF'
            buttonStyle={styles.buttonTop}
            onPress={()=> {Actions.forgot()}}
            title='申請密碼重設' />

          <Button
            backgroundColor='#007AFF'
            buttonStyle={styles.buttonTop}
            onPress={() => this.setState({ visibleModal: 1 })}
            title='登出' />
        </View>
        <View>
          <TouchableOpacity onPress={ () => this.setState({ visibleModal:2 })}>
            <View style={{alignItems: 'center'}}>
              <Text style={{textDecorationLine:'underline'}}>刪除帳號</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={ () => this.setState({ visibleModal: null }) }>
          <Modal
            isVisible={this.state.visibleModal === 1}
            hideOnBack={false}>
            {this._renderSignOutContent()}
          </Modal>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={ () => this.setState({ visibleModal: null }) }>
          <Modal
            isVisible={this.state.visibleModal === 2}
            hideOnBack={false}>
            {this._renderDeleteAccountContent()}
          </Modal>
        </TouchableWithoutFeedback>
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
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: 400
  },
}
