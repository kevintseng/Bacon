import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import SignUpFour from '../../../components/SignUpFour/SignUpFour'

const options = {
  mediaType: 'photo',
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 0.8,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'Bacon'
  },
}

@inject("SignUpInStore") @observer
export default class SignUpFourScene extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
    this.state = {
      image: null
    }
  }

  addImage = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        return
      } else if (res.error) {
        console.log(res.error)
      } else {
        ImageResizer.createResizedImage(res.uri, 200, 200, 'JPEG', 80)
        .then((resizedImageUri) => {
          this.SignUpInStore.setPhotoURL(resizedImageUri)
        }).catch((err) => {
           console.log(err)
        })
      }
    })
  }

  buttonOnPress = () => {
    this.SignUpInStore.setUpInStatus('註冊')
    Actions.Auth({ type: 'reset' })
  }

  render(){
    return(
      <SignUpFour
        buttonText='開始使用'
        topButtonText='新增個人照片一張'
        buttonOnPress={ this.buttonOnPress }
        topButtonOnPress={ this.addImage }
        imgSource={ this.SignUpInStore.photoURL }
      />
    )
  }
}