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
import { Text, Button,ListItem,SocialIcon , FormLabel, FormInput,FormValidationMessage} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { autorun } from 'mobx'; // eslint-disable-line
import FormErrorMsg from '../../components/FormErrorMsg';
import MessageBarAlert from 'react-native-message-bar/MessageBar';
import MessageBarManager from 'react-native-message-bar/MessageBarManager';


const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export default class ChangePassword extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
    OgPassword: PropTypes.string,
    NewPassword: PropTypes.string,
    ConfirmNewPassword: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      OgPassword: '',
      NewPassword: '',
      ConfirmNewPassword: '',

      OgPasswordErr: false,
      NewPasswordErr: false,
      ConfirmNewPasswordErr: false,
    };
  }



  signin = async () => {
    this.setState({
      loading: true,
      OgPasswordErr: false,
      NewPasswordErr: false,
      ConfirmNewPasswordErr: false,
    });
    if(this.ogPasswordCheck()) {
      this.fs.auth().signInWithEmailAndPassword(this.store.user.email, this.state.OgPassword)
      .then(() => {
        //Actions.drawer();
        console.log('login true')
        this.setState({
          OgPasswordErr: false,
        });
        this.updatePwd();

      })
      .catch(err => {
        console.error(err);
        this.setState({
          OgPasswordErr: err.message,
          loading: false,
        });
        console.log('lgoin false')
        MessageBarManager.showAlert({
          message: "密碼修改失敗",
          alertType: 'error'
        });
      });
    }else{
      this.setState({
        loading:false,
      })
    }
  }


  updatePwd = async () => {
    if(this.newPasswordCheck() && this.confirmNewPasswordCheck() && this.newPwd_and_confirmPwdCheck()){
      let user = this.fs.auth().currentUser;
      let newPassword = this.state.ConfirmNewPassword;

      user.updatePassword(newPassword).then(function(){
        console.log('Update successful')
        //Alert.alert(
        //'',
        //'修改密碼成功',
        //[
        //{text: 'OK', onPress: () => console.log('OK Pressed!')},
        //]
        //);
        MessageBarManager.showAlert({
          message: "密碼修改成功",
          alertType: 'success'
        });
      }, function(error){
        console.log('error happened')
        MessageBarManager.showAlert({
          message: "密碼修改失敗",
          alertType: 'error'
        });
      });
    }
    this.setState({loading: false,});
  }


  ogPasswordCheck = () => {
    const ogpwd =  /^[A-Za-z0-9]{6,10}$/;
    if(this.state.OgPassword.match(ogpwd))
    {
      return true;
    } else {
      this.setState({
        OgPasswordErr: '請輸入數字或英文字母組合的6~10字密碼',
      })
      return false;
    }
  }

  newPasswordCheck() {
    const newpwd =  /^[A-Za-z0-9]{6,10}$/;
    if(this.state.NewPassword.match(newpwd))
    {
      return true;
    } else {
      this.setState({
        NewPasswordErr: '請輸入數字或英文字母組合的6~10字密碼',
      })
      return false;
    }
  }

  confirmNewPasswordCheck() {
    const confirmNewpwd =  /^[A-Za-z0-9]{6,10}$/;
    if(this.state.NewPassword.match(confirmNewpwd))
    {
      return true;
    } else {
      this.setState({
        ConfirmNewPasswordErr: '請輸入數字或英文字母組合的6~10字密碼',
      })
      return false;
    }
  }

  newPwd_and_confirmPwdCheck() {
    if(this.state.NewPassword == this.state.ConfirmNewPassword){
      return true;
    } else {
      this.setState({
        ConfirmNewPasswordErr: '確認新密碼有誤 請再次確認',
      })
      return false;
    }
  }


  onOgPasswordChange = OgPassword => {
    this.setState({
      OgPassword: OgPassword.trim(),
    });
  }

  onNewPasswordChange = NewPassword => {
    this.setState({
      NewPassword: NewPassword.trim(),
    });
  }

  onConfirmNewPasswordChange = ConfirmNewPassword => {
    this.setState({
      ConfirmNewPassword: ConfirmNewPassword.trim(),
    });
  }

  clearInput = InputName => {
    this.refs[InputName].setNativeProps({text: ''});
  }


  componentDidMount() {
    console.log('ChangePassword rendered');
    MessageBarManager.registerMessageBar(this.refs.alert);
  };

  componentWillUnmount() {
  // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  };

  showSuccessAlert = async () => {
    // Title or Message is at least Mandatory
    // alertType is not Mandatory, but if no alertType provided, 'info' (blue color) will picked for you

    // Simple show the alert with the manager
    console.log('MessageBar in')
    MessageBarManager.showAlert({
      message: "This is a simple alert",
      alertType: 'success'
    });
  }



  render() {

    return(
      <View>

          <FormLabel>舊密碼</FormLabel>
          <FormInput
            ref='ogpwd'
            secureTextEntry
            placeholder='請輸入原始密碼'
            maxLength={10}

            value={this.state.OgPassword}
            onChangeText={OgPassword =>
              this.onOgPasswordChange(OgPassword)}
          />

          {
            this.state.OgPasswordErr &&   <FormErrorMsg>{this.state.OgPasswordErr}</FormErrorMsg>
          }

          <FormLabel>新密碼</FormLabel>
          <FormInput
            ref='newpwd'
            secureTextEntry
            placeholder='請輸入6~10字英數組合密碼'
            maxLength={10}
            value={this.state.NewPassword}
            onChangeText={NewPassword =>
              this.onNewPasswordChange(NewPassword)}
          />

          {
            this.state.NewPasswordErr &&   <FormErrorMsg>{this.state.NewPasswordErr}</FormErrorMsg>
          }

          <FormLabel>確認新密碼</FormLabel>
          <FormInput
            ref='cfnpwd'
            secureTextEntry
            placeholder='請再次輸入6~10字英數組合密碼'
            maxLength={10}
            value={this.state.ConfirmNewPassword}
            onChangeText={ConfirmNewPassword =>
              this.onConfirmNewPasswordChange(ConfirmNewPassword)}
          />

          {
            this.state.ConfirmNewPasswordErr &&   <FormErrorMsg>{this.state.ConfirmNewPasswordErr}</FormErrorMsg>
          }

          <Button
            backgroundColor='#007AFF'
            //color='#007AFF'
            buttonStyle={styles.buttonTop}
            onPress={this.signin}
            title={this.state.loading ? '處理中...' : '確認'}
          />

          <MessageBarAlert ref="alert" />
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
