import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { View } from 'react-native'

import BaconForm from '../../../../views/BaconForm'
import StatesMessage from '../../../../views/StatesMessage'

const styles = {
  error: {
    position: 'absolute',
    left: 20
  }
}

@inject('SignUpStore') @observer
export default class PasswordContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  realTimeCheckPassword = str => {
    this.SignUpStore.setPassword(str)
    //this.SignUpStore.checkPassword()
  }

  render() {
    return(
      <View>
        <View style={styles.error}>
          <StatesMessage
            state={ this.SignUpStore.passwordDetector }
            message={ this.SignUpStore.passwordIndicator }
          />
        </View>
        <BaconForm
          iconSource={ require('../../../../../images/ico_logo_pass.png') } 
          placeholder='請輸入6-12字英數密碼組合'
          value={ this.SignUpStore.password }
          maxLength={ 12 } 
          onChangeText={ this.realTimeCheckPassword }
          //onBlur={ this.SignUpStore.checkPassword }
          secureTextEntry
        />
      </View>
    )
  }
}