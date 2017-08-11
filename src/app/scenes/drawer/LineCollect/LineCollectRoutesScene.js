import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

const { width, height } = Dimensions.get('window')

@inject('firebase','SubjectStore','MeetChanceStore') @observer
export default class LineCollectRoutesScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }

  goToBonus= () => {
    Actions.Bonus()
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Text>LineCollectRoutes</Text>
        <Button title='轉到儲值業面' onPress={this.goToBonus}/>
      </View>
    )
  }
}
