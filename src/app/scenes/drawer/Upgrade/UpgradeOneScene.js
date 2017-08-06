import React, { Component } from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/UpgradeOneScene/BaconRoutesContainer'
import UpgradeContainer from '../../../containers/UpgradeOneScene/UpgradeContainer'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 200,
    alignSelf: 'center',
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

@inject('SubjectStore') @observer
export default class UpgradeOneScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }


  render() {
    return(
      <View style={ styles.view }>

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