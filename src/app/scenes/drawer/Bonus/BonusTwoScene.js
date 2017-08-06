import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from '../../../containers/BonusTwoScene/BaconRoutesContainer'
import BonusContainer from '../../../containers/BonusTwoScene/BonusContainer'
import BonusTitleContainer from  '../../../containers/BonusTwoScene/BonusTitleContainer/BonusTitleContainer'

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

export default class BonusTwoScene extends Component {

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