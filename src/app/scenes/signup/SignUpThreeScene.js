import React, { Component } from 'react'
import { View } from 'react-native'

import BaconRoutesContainer from '../../containers/SignUpThree/BaconRoutesContainer'
import EmailContainer from '../../containers/SignUpThree/EmailContainer'
import PasswordContainer from '../../containers/SignUpThree/PasswordContainer'
import DisplayNameContainer from '../../containers/SignUpThree/DisplayNameContainer'
import BirthdayContainer from '../../containers/SignUpThree/BirthdayContainer'
import PolicyContainer from '../../containers/SignUpThree/PolicyContainer'

import EmailStatesConatiner from '../../containers/SignUpThree/EmailStatesConatiner'
import PasswordStatesConatiner from '../../containers/SignUpThree/PasswordStatesConatiner'
import DisplayNameStatesConatiner from '../../containers/SignUpThree/DisplayNameStatesConatiner'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 150
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class SignUpThreeScene extends Component {

  render() {
    return(
       <View style={ styles.view }>

        <View style={{flex: 1, marginTop: 20}}>
          <EmailContainer/>
          <PasswordContainer/>
          <DisplayNameContainer/>
          <BirthdayContainer/>
          <View style={{marginTop: 40}}>
            <PolicyContainer/>
          </View>
          <View style={{position: 'absolute', top: 0, left: 20}}>
            <EmailStatesConatiner/>
          </View>

          <View style={{position: 'absolute', top: 70, left: 20}}>
            <PasswordStatesConatiner/>
          </View>

          <View style={{position: 'absolute', top: 140, left: 20}}>
            <DisplayNameStatesConatiner/>
          </View>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
