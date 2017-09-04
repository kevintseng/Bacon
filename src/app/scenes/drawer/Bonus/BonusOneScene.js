import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/BonusOneScene/BaconRoutesContainer'
import BonusContainer from '../../../containers/BonusOneScene/BonusContainer'
import BonusTitleContainer from  '../../../containers/BonusOneScene/BonusTitleContainer/BonusTitleContainer'
import PolicyModalContainer from '../../../containers/BonusOneScene/PolicyModalContainer'

const styles = {
  view: {
    flex: 1
  },
  top: {
    position: 'absolute', 
    top: 30,
    alignSelf: 'center',
  },
  middle: {
    position: 'absolute', 
    top: 160,
    alignSelf: 'center',
  },
  textView: {
    position: 'absolute', 
    bottom: 200,
    alignSelf: 'center',
  },
  text: {
    //
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

@inject('ControlStore') @observer
export default class BonusOneScene extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }
  
  render() {
    return(
      <View style={ styles.view }>
        <PolicyModalContainer/>
        <View style={ styles.top }>
          <BonusTitleContainer/>
        </View>

        <View style={ styles.middle }>
          <BonusContainer/>
        </View>

        <View style={ styles.textView }>
          <Text style={ styles.text } onPress={ this.ControlStore.setBonusPolicyModal }>條款細則</Text>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}