import React, { Component } from 'react'
import { View, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject } from "mobx-react"

@inject("firebase","SubjectStore")
export default class SettingScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  onPressSignOut = () => {
    this.firebase.auth().signOut()
    this.setOffline(this.SubjectStore.uid)
  }

  setOffline(user_id){
    this.firebase.database().ref("/online/" + user_id).remove()
  }

  render(){
    return(
      <View>
        <Button title= '登出' onPress={ this.onPressSignOut }/>
        <Image 
          style={{ alignSelf: 'center', width: 300, height: 300 }}
          source={require('../../images/avatar.jpg')}       
        />
      </View>
    )
  }
}
