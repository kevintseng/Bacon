import React, { Component } from 'react'
import { ScrollView, View, Text, Button, Platform, BackHandler, ToastAndroid, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/BonusOneScene/BaconRoutesContainer'
import BonusContainer from '../../../containers/BonusOneScene/BonusContainer'
import BonusTitleContainer from  '../../../containers/BonusOneScene/BonusTitleContainer/BonusTitleContainer'
import PolicyModalContainer from '../../../containers/BonusOneScene/PolicyModalContainer'

const styles = {
  ...Platform.select({
    ios: {
      view: {
        flex: 1,
      },
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
      bottom: {
        position: 'absolute',
        bottom: 0
      },
      text: {
        fontFamily: 'NotoSans',
        flexWrap: 'wrap',
        color: '#D63768',
        fontSize: 14,
      },
      warning: {
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 185,
      },
      warningToch : {
        //marginRight: 5
      }
    },
  })
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

          <View style={ styles.warning }>
            <TouchableOpacity style={ styles.warningToch } onPress={this.ControlStore.setSettingPolicyModal}>
              <Text style={ styles.text } onPress={ this.ControlStore.setSettingPolicyModal }>使用條款  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.warningToch } onPress={this.ControlStore.setSettingRuleModal}>
              <Text style={ styles.text } onPress={ this.ControlStore.setSettingRuleModal }>  隱私權政策</Text>
            </TouchableOpacity>
          </View>


        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
