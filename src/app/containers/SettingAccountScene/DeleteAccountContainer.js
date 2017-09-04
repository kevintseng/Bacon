import React, { Component } from 'react'
import { Modal, View, TextInput, TouchableHighlight, Text } from 'react-native'
import { inject, observer } from "mobx-react"

import PasswordContainer from './PasswordContainer'
import RedLineButton from '../../views/RedLineButton/RedLineButton'

@inject('ControlStore') @observer
export default class DeleteAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }
  
  render() {
    return(
      <View style={{flex: 1}}>
        <RedLineButton
          text='刪除帳號'
          onPress={ this.ControlStore.setDeleteAccounrModal }
        />
      </View>
    )
  }
}
