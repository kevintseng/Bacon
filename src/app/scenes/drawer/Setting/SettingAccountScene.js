import React, { Component } from 'react'
import { View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject } from "mobx-react"

import SettingAccount from '../../../components/SettingAccount/SettingAccount'


@inject("firebase","SubjectStore")
export default class SettingAccountScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  deleteAccount = () => {
    this.firebase.database().ref("users/" + this.SubjectStore.uid + "/delete").set(true)
  }

  SignOut = () => {
    this.setOffline(this.SubjectStore.uid)
    this.firebase.auth().signOut()
  }

  setOffline(user_id){
    this.firebase.database().ref("/online/" + user_id).remove()
  }

  render() {
    return(
      <SettingAccount
        topButtonText='申請密碼重設'
        //topButtonOnPress={}
        midButtonText='登出'
        midButtonOnPress={ this.SignOut }
        bottomButtonText='刪除帳號'
        bottomButtonOnPress={ this.deleteAccount }
      />
    )
  }
}

/*
      <View>
        <Button title= '登出' onPress={ this.onPressSignOut }/>
        <Image 
          style={{ alignSelf: 'center', width: 300, height: 300 }}
          source={require('../../../../images/avatar.jpg')}       
        />
      </View>
*/
