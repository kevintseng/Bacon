import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
// custom components
import BigAvatar from '../../../components/common/BigAvatar/BigAvatar'

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
export default class BigAvatarContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  addImage = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        return
      } else if (res.error) {
        console.log(res.error)
      } else {
        ImageResizer.createResizedImage(res.uri, 200, 200, 'JPEG', 80) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
        .then((resizedImageUri) => {
          this.SignUpInStore.setPhotoURL(resizedImageUri)
        }).catch((err) => {
           console.log(err)
        })
      }
    })
  }

  render() {
    return(
      <BigAvatar
        imgSource={ this.SignUpInStore.photoURL }
        topButtonText='新增個人照片一張'
        topButtonOnPress={ this.addImage }
      />
    )
  }
}