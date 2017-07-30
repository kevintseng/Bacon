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

        <View>
          <EmailContainer/>
          <PasswordContainer/>
          <DisplayNameContainer/>
          <BirthdayContainer/>
          <PolicyContainer/>
          
          <EmailStatesConatiner/>
          <PasswordStatesConatiner/>
          <DisplayNameStatesConatiner/>
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
