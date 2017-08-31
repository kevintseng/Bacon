import React, { Component } from 'react'
import { Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutes from '../../../views/BaconRoutes/BaconRoutes'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }
  
  buttonOnPress = () => {
    if (this.SubjectEditStore.address) {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/address').set(this.SubjectEditStore.address)
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/latitude').set(this.SubjectEditStore.latitude)
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/longitude').set(this.SubjectEditStore.longitude)
      this.SubjectStore.setAddress(this.SubjectEditStore.address)
      Actions.AboutMeTab({type: 'reset'})
    } else {
      Alert.alert( 
        '輸入錯誤', '請輸入所在位置', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    }
  }

  render() {
    return(
      <BaconRoutes
        routesText='完成'
        routesOnPress={ this.buttonOnPress } 
      />
    )
  }
}