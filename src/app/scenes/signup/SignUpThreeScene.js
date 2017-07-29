// node modules
import React, { Component } from 'react'
import { View } from 'react-native'
// custom components
import ButtonThemeContainer from '../../containers/SignUpThree/ButtonThemeContainer/ButtonThemeContainer'
import EmailInputContainer from '../../containers/SignUpThree/EmailInputContainer/EmailInputContainer'
import PasswordInputContainer from '../../containers/SignUpThree/PasswordInputContainer/PasswordInputContainer'
import DisplayNameInputContainer from '../../containers/SignUpThree/DisplayNameInputContainer/DisplayNameInputContainer'
import BirthdayChooseContainer from '../../containers/SignUpThree/BirthdayChooseContainer/BirthdayChooseContainer'
import PolicyContainer from '../../containers/SignUpThree/PolicyContainer/PolicyContainer'
import MailStatesConatiner from '../../containers/SignUpThree/MailStatesConatiner/MailStatesConatiner'
import PasswordStatesConatiner from '../../containers/SignUpThree/PasswordStatesConatiner/PasswordStatesConatiner'
import DisplayNameStatesConatiner from '../../containers/SignUpThree/DisplayNameStatesConatiner/DisplayNameStatesConatiner'

const styles = {
  view: {
    flex: 1
  },
  middle: {
    position: 'absolute', 
    top: 150
  }
}

export default class SignUpThreeScene extends Component {

  render() {
    return(
       <View style={ styles.view }>
        <View>
          <EmailInputContainer/>
          <PasswordInputContainer/>
          <DisplayNameInputContainer/>
          <BirthdayChooseContainer/>
          <PolicyContainer/>
          <MailStatesConatiner/>
          <PasswordStatesConatiner/>
          <DisplayNameStatesConatiner/>
        </View>
        <ButtonThemeContainer/>
      </View>
    )
  }
}
