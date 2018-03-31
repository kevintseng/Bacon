import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert, View, Modal, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = {
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 15,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
    padding: 10
  },
  text: {
    padding: 20 
  }
}

@inject('firebase','ControlStore') @observer
export default class ResetPasswordModalContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.ControlStore = this.props.ControlStore
    this.state = {
      email: ''
    }
  }

  submit = () => {
    this.firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
      this.ControlStore.setPasswordResetModal()
      alert('密碼重置信件已寄出')
    }).catch(error => {
      alert(error)
    });
  }


  render() {
    return(
        <Modal animationType={"none"} transparent={true} visible={this.ControlStore.passwordRsetModal} onRequestClose={ this.ControlStore.setPasswordResetModal  } >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              flex: 1,
              justifyContent: 'center'
            }}
            onPress={this.ControlStore.setPasswordResetModal}
          >
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width: width*0.8,
                height: height*0.35,
                position: 'absolute',
                borderRadius: 15,
                justifyContent: 'space-around'
              }}
            >
                <TextInput
                  style={{width: width*0.7}}
                  underlineColorAndroid="#d63768"
                  placeholder = '請輸入帳號(email)'
                  onChangeText = { value => this.setState({email: value}) }
                  value = { this.state.email }
                  keyboardType='email-address'
                />
              <Text onPress={this.submit}>確認送出</Text>
            </View>
          </TouchableOpacity>
        </Modal>
    )
  }
}