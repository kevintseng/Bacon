import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import UseBonus from '../../../views/UseBonus'

const styles = {
  edit: {
    flex: 1
  }
}

@inject('SubjectStore') @observer
export default class UseBonusScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {

  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  routesOnPress = () => {
    alert('繼續')
  }

  render() {
    return(
      <View style = {styles.edit}>
        <UseBonus
          bonus={this.SubjectStore.bonus}
          avatar={this.SubjectStore.avatar}
          reasonStr={'對 ' + this.SubjectStore.nickname +' 送出更多訊息，展現你的真誠與積極'}
          preStr={'每多一則需要'}
          cost={30}
          postStr={'Q點'}
          routesText={'繼續'}
          routesOnPress={this.routesOnPress}
        />
      </View>
    )
  }
}