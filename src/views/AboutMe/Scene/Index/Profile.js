'use strict'
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
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

//const ADD_IMAGE = require('hookup/src/images/addImage.png')
const Language_Options = ["中文","英文","日文","韓文","菲律賓語","越南語"]

@observer
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store
    //this.state = {
    //  items: [{ id: 'addImage', src: ADD_IMAGE }],
    //};
  }

  componentDidMount() {
    Actions.refresh({ key: 'drawer', open: false })
  }

  // 施工中...
  handleUpgrade = () => {
    alert('轉跳到升級頁面，施工中...')
    //this.store.upgradeMembership(this.firebase);
  }

  handleAddCredit = () => {
    alert('轉跳到Q點儲值頁面，施工中...')
  }

  handleSendVerifyEmail = () => {
    this.firebase().auth().currentUser.sendEmailVerification().then(() => {
      alert("認證信已寄出")
      console.log('Email verification request sent');
    }, error => {
      console.log(error);
    });
  }

  handleVerifyPhoto = () => {
    alert('轉跳到相片認證頁面，施工中...');
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
  defaultLangauges(){
    const langauges = new Object
    Language_Options.forEach((langauge) => { langauges[langauge] = false })
    return langauges
  }

  firebase(){
    return this.props.store.firebase
  }

  emailVerified(){
    return this.props.store.user.emailVerified
  }

  photoVerified(){
    return this.props.store.user.photoVerified
  }

  photoURL(){
    return this.store.user.photoURL
  }

  displayName(){
    return this.store.user.displayName
  }

  city(){
    return this.store.user.city.description
  }

  vip(){
    return this.store.user.vip
  }

  bio(){
    return this.props.store.user.bio
  }

  lang(){
    return this.props.store.user.lang ? this.props.store.user.lang : this.defaultLangauges
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
          emailVerified = { this.emailVerified() }
          emailRightTitle = { "重寄認證信" }
          handleSendVerifyEmail = { this.handleSendVerifyEmail }
          photoVerified = { this.photoVerified() }
          handleVerifyPhoto = { this.handleVerifyPhoto }
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
