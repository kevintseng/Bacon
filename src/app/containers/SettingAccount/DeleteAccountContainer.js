import React, { Component } from 'react'
import { Modal, View, TextInput, TouchableHighlight, Text } from 'react-native'
import { inject, observer } from "mobx-react"

import PasswordContainer from './PasswordContainer'
import RedLineButton from '../../views/RedLineButton/RedLineButton'

@inject('firebase','SubjectStore','SignUpInStore') @observer
export default class DeleteAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SignUpInStore = this.props.SignUpInStore
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      modalVisible: false,
      password: null
    }
  }

  //onPress = () => {
  //  this
  //}

  alertPassword = () => {
    this.setState({
      modalVisible: true
    })
  }

  deleteAccount = () => {
    const user = this.firebase.auth().currentUser
    const credential = this.firebase.auth.EmailAuthProvider.credential(
      this.SubjectStore.email, 
      this.SignUpInStore.password
    )    
    user.reauthenticateWithCredential(credential).then(function() {
      console.log('重認證成功')
    }).catch(function(error) {
      console.log(error)
    })
    user.delete().then(function() {
      console.log('刪除成功')
    }).catch( err => {
      console.log(err)
    }) 
  }

  close = () => {
    this.setState({modalVisible: false})
    this.deleteAccount()
  }
  
  render() {
    return(
      <View style={{flex: 1}}>
        <Modal 
          animationType={"slide"} 
          transparent={false} 
          visible={this.state.modalVisible} 
          onRequestClose={() => {alert("Modal has been closed.")}} >
            <View style={{marginTop: 22}}> 
              <View> 
                <Text>Hello World!</Text> 
                <TouchableHighlight onPress={ this.close }> 
                <Text>Hide Modal</Text> 
                </TouchableHighlight> 
                <PasswordContainer/>
              </View> 
            </View>
        </Modal>
        <RedLineButton
          text='刪除帳號'
          onPress={ this.alertPassword }
        />
      </View>
    )
  }
}