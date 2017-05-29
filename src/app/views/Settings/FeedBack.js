import React, {Component, PropTypes} from 'react';
import { View, Dimensions, StyleSheet, ListView, TextInput, Alert, Navigator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text ,List, ListItem, FormInput, Button, CheckBox} from 'react-native-elements';

import ActionSheet from 'react-native-actionsheet';
import MessageBarAlert from 'react-native-message-bar/MessageBar';
import MessageBarManager from 'react-native-message-bar/MessageBarManager';

//import * as firebase from 'firebase';
// 将 Firebase 的 config 值引入
//import { FirebaseConfig } from '../Configs';
//import AppStore from '../store/AppStore'; // eslint-disable-line



const {width, height} = Dimensions.get('window'); //eslint-disable-line
const buttons = ['取消', '确认退出', '😄😄😄', '哈哈哈'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
//const fs = Firebase.initializeApp(FirebaseConfig);
@observer
export default class FeedBack extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
    FeedbackText: PropTypes.string,
    FeedbackType: PropTypes.string,
    //radio_props: PropTypes.array,
    ActionSheetButtons: PropTypes.array,
    Cancel_Index: PropTypes.number,
    Destructive_Index: PropTypes.number,
  }



  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      size: {
          width,
          height
      },
      //dataSource: ds.cloneWithRows(['row 1', '' ,'row 3','row 4']),
    };
    this.ActionSheetButtons = ['取消', 'Type1', 'Type2', 'Type3'];
    this.Cancel_Index = 0;
    this.Destructive_Index = 1;
    this.FeedbackType = '請選擇意見類型'

  }



  onReactionTextChange = ReactionText => {
    this.setState({
      ReactionText: ReactionText.trim(),
    });
  }

  _handlePress(index) {

    switch (index) {
      case 0:
          console.log(index);
          break;
      case 1:
          console.log(index);
          this.FeedbackType = 'Type1';
          this.setState({FeedbackType: 'Type1'});
          console.log(this.FeedbackType);
          break;
      case 2:
          console.log(index);
          this.FeedbackType = 'Type2';
          this.setState({FeedbackType: 'Type2'});
          console.log(this.FeedbackType);
          break;
      case 3:
          console.log(index);
          this.FeedbackType = 'Type3';
          this.setState({FeedbackType: 'Type3'});
          console.log(this.FeedbackType);
          break;

    }
  }

  show = () =>{
    console.log('show now!');
    this.ActionSheet.show();
  }

  CheckFeedbackType() {
    var feedbackType = this.ActionSheetButtons;
    var CheckValue = this.FeedbackType;
    var revalue = false;
    //console.log(feedbackType);
    //let CheckValue = feedbackType.isArray(this.FeedbackType);
    //let CheckValue;
    //console.log(CheckValue);
    //console.log(feedbackType.length);
    //console.log('Type: ' + CheckValue);
    for(var i = 0; i < (feedbackType.length); i++){
      if(String(feedbackType[i]) == String(CheckValue)){
        revalue = true;
        break;
      }else{
        revalue = false;
      }
    }

    if(revalue){
      return true;
    }else{
      return false;
    }

  };

  CheckFeedbackText() {
    const CheckValue = this.state.FeedbackText;
    console.log('text: ' + CheckValue);
    if(CheckValue != "" && CheckValue != undefined){
      console.log('True!!!');
      return true;
    }else{
      console.log('False!!!');
      return false;
    }
  };


  SendReaction = async () =>{
    let user = this.store.user
    const NowTime = new Date();
    const FeedBackDate = NowTime.getFullYear() + "-" + (NowTime.getMonth() + 1) + "-" + NowTime.getDate();
    const PostFeedback = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      FeedbackTime: FeedBackDate,
      FeedbackType: this.FeedbackType,
      FeedbackText: this.state.FeedbackText,
    }
    console.log(user.uid);
    console.log(user.email);
    console.log(user.displayName);
    console.log();
    //console.log(this.state.ReactionText);
    console.log(this.FeedbackType);
    console.log(this.state.FeedbackText);
    console.log(FeedBackDate);

    console.log('Send Type' + this.CheckFeedbackType());



    if(this.CheckFeedbackType() == true){
      if(this.CheckFeedbackText() == true){
        this.fs.database().ref('feedback/').push(PostFeedback, function(error){
          if (error){
            MessageBarManager.showAlert({
              message: "送出失敗",
              alertType: 'error'
            });
          } else{
            MessageBarManager.showAlert({
              message: "送出成功",
              alertType: 'success'
            });
          }
        });

      }else{
        MessageBarManager.showAlert({
          message: "請填寫意見訊息",
          alertType: 'error'
        });
      }
    }else{
      MessageBarManager.showAlert({
        message: "請選擇意見類型",
        alertType: 'error'
      });
    }
  }

  componentDidMount() {
    console.log('ChangePassword rendered');
    MessageBarManager.registerMessageBar(this.refs.alert);
  };

  componentWillUnmount() {
  // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  };


  render() {
    return(
      <View style={{marginTop:0}}>

      <Button
        buttonStyle={{marginTop:20}}
        title={this.FeedbackType}
        onPress={this.show}
      />

      <TextInput
        style={{height: 90, borderColor: 'gray', borderWidth: 1,marginLeft: 15, marginRight: 15, marginTop: 10}}
         editable = {true}
         maxLength = {40}
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(FeedbackText) => this.setState({FeedbackText})}
         value={this.state.FeedbackText}
       />

        <ActionSheet
            ref={(o) => this.ActionSheet = o}
            title="請選擇意見類型"
            options={this.ActionSheetButtons}
            cancelButtonIndex={this.state.Cancel_Index}
            destructiveButtonIndex={this.state.Destructive_Index}
            onPress={this._handlePress.bind(this)}
        />

        <Button
          backgroundColor='#007AFF'
          //color='#007AFF'
          buttonStyle={styles.buttonTop}
          onPress={this.SendReaction}
          title='送出' />

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
