import React, { Component } from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/BonusOneScene/BaconRoutesContainer'
import BonusContainer from '../../../containers/BonusOneScene/BonusContainer'
import BonusTitleContainer from  '../../../containers/BonusOneScene/BonusTitleContainer/BonusTitleContainer'

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
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

@inject('SubjectStore') @observer
export default class BonusOneScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }


  render() {
    return(
      <View style={ styles.view }>

        <View style={ styles.top }>
          <BonusTitleContainer/>
        </View>

        <View style={ styles.middle }>
          <BonusContainer/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}