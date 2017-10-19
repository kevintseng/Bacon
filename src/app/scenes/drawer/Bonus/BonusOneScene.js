import React, { Component } from 'react'
import { ScrollView, View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
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
  ...Platform.select({
    ios: {
      top: {
        marginTop: 10,
        height: 120
      },
      middle: {
        marginTop: 10,
        alignSelf: 'center',
        height: 150,
      },
      textView: {
        marginTop: 10,
        alignSelf: 'center',
        height: 40,
      },
      bottom: {
        marginBottom: 0,
      },
    },
    android: {
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
      bottom: {
        position: 'absolute',
        bottom: 0
      },
    },
  }),
  text: {
  },
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
      <ScrollView style={ styles.view }>
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
        <View style={ styles.textView }>
          <Text style={ styles.text } onPress={ this.ControlStore.setSettingPolicyModal }>使用條款</Text>
        </View>
        <View style={ styles.textView }>
          <Text style={ styles.text } onPress={ this.ControlStore.setSettingRuleModal }>隱私權政策</Text>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </ScrollView>
    )
  }
}
