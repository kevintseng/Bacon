//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import Moment from 'moment';
import { BasicInfo } from './BasicInfo';
import AccountStatus from './AccountStatus';
import InfoArea from './InfoArea';


const ADD_IMAGE = require('../../images/addImage.png');

const {width} = Dimensions.get('window');
const styles = {
  viewWrapper: {
    width,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      margin: 0,
      padding: 0,
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

@observer
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.storage = this.props.storage;
    this.state = {
      editBasicInfo: false,
      message: '',
      visible: false,
      tip: null,
      items: [{ id: 'addImage', src: ADD_IMAGE }],
      bio: this.store.user.bio ? this.store.user.bio : '',
      hobby: this.store.user.hobby ? this.store.user.hobby : '',
      language: this.store.user.lang ? this.store.user.lang : '',
      bioHeight: 50,
      emailVerificationButtonLabel: '重寄認證信',
      vip: this.store.user.vip ? this.store.user.vip : false,
    };
  }

  componentDidMount() {
    Reactotron.log('Profile rendered');
    Actions.refresh({ key: 'drawer', open: false });
    // Build an array of 60 photos
  }

  componentWillUnmount() {

  }

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  getAge = (dob) => {
    return Moment().diff(dob, 'years');
  }

  getGender = (gender) => {
    if(gender === 'm') {
      return '男';
    }
    if(gender === 'f') {
      return '女';
    }
  }

  handleEditBasicInfo = () => {
    this.setState({
      editBasicInfo: true,
    })
  }

  handleSaveBasicInfo = () => {
    this.setState({
      editBasicInfo: false,
    })
  }

  handleUpgrade = () => {
    this.store.upgradeMembership(this.firebase);
    Reactotron.log('upgrade button pressed');
  }

  handleAddCredit = () => {
    this.setState({
      visible: true,
      message: '儲值鈕'
    });
    Reactotron.log('addCredit button pressed');
  }

  handleSendVerifyEmail = () => {
    const user = this.firebase.auth().currentUser;
    if(user) {
      this.setState({
        emailVerificationButtonLabel: '已寄出',
      });
    }
    user.sendEmailVerification().then(() => {
      Reactotron.log('Email verification request sent');
    }, error => {
      Reactotron.log(error);
    });
  }

  handleVerifyPhoto = () => {

    Reactotron.log('Verify Photo Pressed');
  }

  _onChangeHeight = (before, after) => {
    Reactotron.log('before: ' + before + ' after: ' + after);
  }

  handleUpdateBio = val => {
    this.store.setBio(val);
    Reactotron.log('setBio: ' + val);
    this.updateToFirebase('bio', val);
  }

  handleUpdateHobby = val => {
    this.store.setHobby(val);
    Reactotron.log('setHobby: ' + val);
    this.updateToFirebase('hobby', val);
  }

  handleUpdateLang = val => {
    this.store.setLang(val);
    this.updateToFirebase('lang', val);
    Reactotron.log('setLanguage: ' + val);
  }

  updateToFirebase(key, val) {
    const setFirebase = this.firebase.database().ref('users/' + this.store.user.uid + '/' + key);
    setFirebase.set(val);
  }

  render() {
    Reactotron.log(this.store.user);
    const user = this.store.user;
    const age = this.getAge(user.birthday);
    const gender = this.getGender(user.gender);
    // const userImg = {uri: user.photoURL};
    return(
      <ScrollView>
        <BasicInfo
          displayName={user.displayName}
          location={user.city}
          avatar={user.photoURL}
          handleEditBasicInfo={this.handleEditBasicInfo}
          />
        <AccountStatus
          vip={this.store.user.vip}
          upgrade={this.handleUpgrade}
          addCredit={this.handleAddCredit}
          />
          <ListItem
            key='email'
            title='Email 認證'
            rightTitle={this.state.emailVerificationButtonLabel}
            rightTitleStyle={{ color: '#2962FF' }}
            onPress={this.handleSendVerifyEmail}
            hideChevron
            subtitle='未完成'
            />
          <ListItem
            key='verifiedPhoto'
            title='相片認證'
            rightTitle='進行認證'
            rightTitleStyle={{ color: '#2962FF' }}
            hideChevron
            subtitle='未完成'
            />
          <InfoArea
            label={'自我介紹'}
            defaultValue={this.state.bio}
            minHeight={60}
            maxLength={300}
            handleFunc={this.handleUpdateBio}
            />
          <InfoArea
            label={'興趣愛好'}
            defaultValue={this.state.hobby}
            minHeight={30}
            maxLength={150}
            handleFunc={this.handleUpdateHobby}
            />
          <InfoArea
            label={'語言能力'}
            defaultValue={this.state.language}
            minHeight={30}
            maxLength={50}
            handleFunc={this.handleUpdateLang}
            />
          <View style={{ height: 20 }} />
      </ScrollView>
    );
  }
}
