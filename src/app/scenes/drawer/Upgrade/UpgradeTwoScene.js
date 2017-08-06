import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from '../../../containers/UpgradeTwoScene/BaconRoutesContainer'
import UpgradeContainer from '../../../containers/UpgradeTwoScene/UpgradeContainer'
import UpgradeTitleContainer from  '../../../containers/UpgradeTwoScene/UpgradeTitleContainer/UpgradeTitleContainer'

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
    top: 200,
    alignSelf: 'center',
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class UpgradeTwoScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
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