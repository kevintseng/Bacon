import React, { Component } from 'react'
import { View } from 'react-native'

import EmailContainer from '../../containers/SignUpThreeScene/EmailContainer'
import PasswordContainer from '../../containers/SignUpThreeScene/PasswordContainer'
import NickNameContainer from '../../containers/SignUpThreeScene/NickNameContainer'
import BirthdayContainer from '../../containers/SignUpThreeScene/BirthdayContainer'
import PolicyContainer from '../../containers/SignUpThreeScene/PolicyContainer'

import EmailStatesConatiner from '../../containers/SignUpThreeScene/EmailStatesConatiner'
import PasswordStatesConatiner from '../../containers/SignUpThreeScene/PasswordStatesConatiner'
import NickNameStatesConatiner from '../../containers/SignUpThreeScene/NickNameStatesConatiner'
import FailureConatiner from '../../containers/SignUpThreeScene/FailureConatiner'

import BaconRoutesContainer from '../../containers/SignUpThreeScene/BaconRoutesContainer'

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
          <NickNameContainer/>
          <BirthdayContainer/>
          <View style={{marginTop: 40}}>
            <PolicyContainer/>
          </View>
          <View style={{position: 'absolute', top: 2, left: 20}}>
            <EmailStatesConatiner/>
          </View>

          <View style={{position: 'absolute', top: 70, left: 20}}>
            <PasswordStatesConatiner/>
          </View>

          <View style={{position: 'absolute', top: 140, left: 20}}>
            <NickNameStatesConatiner/>
          </View>

          <View style={{position: 'absolute', bottom: 90, alignSelf: 'center',alignItems: 'center'}}>
            <FailureConatiner/>
          </View>

        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
