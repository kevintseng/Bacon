import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import BaconForm from '../../../../../../views/BaconForm'

export default class PasswordContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <BaconForm
        iconSource={ require('../../../../../../../images/ico_logo_pass.png') } 
        placeholder='請輸入6-10字英數密碼組合'
        //value={ this.SignUpInStore.password }
        maxLength={ 12 } 
        //onChangeText={ this.SignUpInStore.setPassword }
        //onBlur={ this.SignUpInStore.checkPassword }
        secureTextEntry
      />
    )
  }
}