'use strict'
import React, { Component } from 'react';
import { ScrollView, View, Alert, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
//import _ from 'lodash'
//import Moment from 'moment';
// Profile Layout
import AccountStatus from './Profile/AccountStatus';
import { BasicInfo } from './Profile/BasicInfo';
import { Verification } from './Profile/Verification';
import { AdvancedInfo } from './Profile/AdvancedInfo';
// Profile correspond Edit Content
import NickBirthday from '../Edit/NickBirthday'
import Location from '../Edit/Location'
import Introduce from '../Edit/Introduce'
import Language from '../Edit/Language'
import Interests from '../Edit/Interests'

const ADD_IMAGE = require('hookup/src/images/addImage.png')
const Language_Options = ["中文","英文","日文","韓文","菲律賓語","越南語"]

@observer
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      editBasicInfo: false,
      message: '',
      visible: false,
      tip: null,
      items: [{ id: 'addImage', src: ADD_IMAGE }],
      emailVerified: this.store.user.emailVerified,
      //bioHeight: 50,
      emailVerificationButtonLabel: '重寄認證信',
      photoVerified: this.store.user.photoVerified,
      vip: this.store.user.vip ? this.store.user.vip : false,
    };
    //Alert.alert("初始化")
  }

  defaultLangauges = () => {
    const langauges = new Object
    Language_Options.forEach((langauge) => { langauges[langauge] = false })
    return langauges
  }

  componentDidMount() {
    Actions.refresh({ key: 'drawer', open: false });
  }

  // Acount State
  handleUpgrade = () => {
    this.store.upgradeMembership(this.firebase);
    console.log('upgrade button pressed');
  }

  handleAddCredit = () => {
    this.setState({
      visible: true,
      message: '儲值鈕'
    });
    console.log('addCredit button pressed');
  }

  // Verification

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  handleSendVerifyEmail = () => {
    const user = this.firebase.auth().currentUser;
    if(user) {
      this.setState({
        emailVerificationButtonLabel: '已寄出',
      });
    }
    user.sendEmailVerification().then(() => {
      console.log('Email verification request sent');
    }, error => {
      console.log(error);
    });
  }

  handleVerifyPhoto = () => {
    alert('相片認證被觸發');
    console.log('Verify Photo Pressed');
  }

  // Edit Content CallBack

  onpressDisplayName = () => {
    Actions.aboutMeEdit({ content: <NickBirthday initcontent = { this.displayName() } save = { this.store.setDisplayName } />})
  }

  onpressLocation = () => {
    Actions.aboutMeEdit({ content: <Location initcontent = { this.city() } save = { this.store.setCity } />})
  }

  onpressIntroduce = () => {
    Actions.aboutMeEdit({ content: <Introduce initcontent = { this.bio() } save = { this.store.setBio } />})
  }

  onpressLanguage = () => {
    Actions.aboutMeEdit({ content: <Language  initcontent = { this.lang() } save = { this.store.setLang } />})
  }

  onpressInterests = () => {
    Actions.aboutMeEdit({ content: <Interests initcontent = { this.hobby() } save = { this.store.setHobby } />})
  }

  // Compute
  photoURL(){
    return this.store.user.photoURL
  }

  displayName(){
    return this.store.user.displayName
  }

  city(){
    return this.store.user.city
  }

  vip(){
    return this.store.user.vip
  }

  bio(){
    return this.props.store.user.bio
  }

  lang(){
    return this.props.store.user.lang
  }

  hobby(){
    return this.props.store.user.hobby
  }  

  renderLanguages(){
    return Object.keys(this.lang()).filter(k => this.lang()[k]).join(',')
  }  

  render() {
    return(
      <ScrollView>
        <BasicInfo 
          avatar = { this.photoURL() }
          displayName = { this.displayName() } 
          location = { this.city() }
          onpressDisplayName = { this.onpressDisplayName }
          onpressLocation = { this.onpressLocation }
        />
        <AccountStatus 
          vip = { this.vip() } 
          upgrade = { this.handleUpgrade } 
          addCredit = { this.handleAddCredit } 
        />
        <Verification 
          emailVerified = { this.state.emailVerified }
          emailRightTitle = { this.state.emailVerificationButtonLabel }
          handleSendVerifyEmail = { this.handleSendVerifyEmail }
          photoVerified = { this.state.photoVerified }
          handleVerifyPhoto = { this.handleVerifyPhoto}
        />
        <AdvancedInfo 
          introduce = { this.bio() } 
          language = { this.renderLanguages() } 
          interests = { this.hobby() }
          onpressIntroduce = { this.onpressIntroduce }
          onpressLanguage = { this.onpressLanguage }
          onpressInterests = { this.onpressInterests }
        />
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }
}
