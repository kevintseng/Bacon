import React, { Component } from 'react'
import { ScrollView, View, Text, Button, Platform, BackHandler, ToastAndroid } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/UpgradeOneScene/BaconRoutesContainer'
import UpgradeContainer from '../../../containers/UpgradeOneScene/UpgradeContainer'
import UpgradeTitleContainer from  '../../../containers/UpgradeOneScene/UpgradeTitleContainer/UpgradeTitleContainer'

const styles = {
  view: {
    flex: 1
  },
  text: {
  },
  ...Platform.select({
    ios: {
      top: {
        height: 110
      },
      middle: {
        marginTop: 10,
      },
      bottom: {
        marginTop: 10,
      },
      textView: {
        marginTop: 10,
        alignSelf: 'center',
        height: 40,
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
        top: 200,
        alignSelf: 'center',
      },
      bottom: {
        position: 'absolute',
        bottom: 0
      },
      textView: {
        position: 'absolute',
        bottom: 200,
        alignSelf: 'center',
      },
    }
  })
}

@inject('SubjectStore') @observer
export default class UpgradeOneScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
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
        <View style={ styles.top }>
          <UpgradeTitleContainer/>
        </View>

        <View style={ styles.middle }>
          <UpgradeContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}
