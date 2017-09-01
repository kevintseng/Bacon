import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert, View, Modal, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native'

import BaconForm from '../../views/BaconForm'

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

@inject('firebase','SubjectStore','ControlStore') @observer
export default class DeleteModalContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.state = {
      password: null
    }
  }

  onChangePassword = str => {
    this.setState({
      password: str
    })
  }

  deleteAccount = () => {
    const user = this.firebase.auth().currentUser
    const credential = this.firebase.auth.EmailAuthProvider.credential(
      this.SubjectStore.email, 
      this.state.password
    )    
    user.reauthenticateWithCredential(credential).then(() => {
      console.log('重認證成功')
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/deleted').set(true).then(()=>{
        user.delete().then(() => {
          console.log('刪除成功')
          //
        }).catch( error => {
          Alert.alert( 
          '刪除失敗', error.message, [ 
            {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
          )
        }) 
      }).catch( error => {
          Alert.alert( 
          '刪除失敗', error.message, [ 
            {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
          )
        }) 
    }).catch( error => {
      Alert.alert( 
        '認證失敗', error.message, [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    })
  }

  delete = () => {
    this.ControlStore.setDeleteAccounrModal()
    this.deleteAccount() 
  }

  render() {
    return(
        <Modal animationType={"fade"} transparent={true} visible={this.ControlStore.deleteAccounrModal} onRequestClose={ this.ControlStore.setDeleteAccounrModal  } >
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                aspectRatio: 1.5,
                width: width*0.8,
                height: height*0.3,
                position: 'absolute',
                borderRadius: 15
              }}
            >
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <View>
                  <Text style={ styles.title }>警告</Text>
                </View>
                <View>
                  <Text style={ styles.text }>刪除帳號將無法再行復原，若仍確定要刪除帳號請輸入您的密碼進行帳號刪除</Text>
                </View>
                <View style={{width: width*0.7, alignSelf: 'center'}}>
                  <TextInput
                    underlineColorAndroid="#d63768"
                    maxLength = { 8 }
                    numberOfLines = { 1 }
                    placeholder = '請輸入您的密碼'
                    onChangeText = { this.onChangePassword }
                    value = { this.state.password }
                    secureTextEntry
                  />
                </View>
                <View>
                  <Text style={ styles.title } onPress={ this.delete }>確認刪除</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
    )
  }
}