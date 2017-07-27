import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import Album from '../../components/common/aboutme/Album/Album'

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

const photos = [
{key: 1, uri: 'https://pic.pimg.tw/wuntinglin/4b84e20809d8f.jpg'},
{key: 2, uri: 'https://i.imgur.com/FHxVpN4.jpg'},
{key: 3, uri: 'https://i.imgur.com/FHxVpN4.jpg'},
{key: 4, uri: 'https://i.imgur.com/FHxVpN4.jpg'},
{key: 5, uri: 'https://i.imgur.com/FHxVpN4.jpg'}
]

@inject("firebase","SubjectStore") @observer
export default class AlbumContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      photoOnPressModal: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  openPicZoom = () => {
    this.setState({photoOnPressModal: true})
  }

  closePicZoom = () => {
    this.setState({photoOnPressModal: false})
  }

  openPicOptions = () => {
    alert('openPicOptions')
  }

  closePicOptions = () => {
    alert('openPicOptions')
  }

  openPicChoose = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        return
      } else if (res.error) {
        console.log(res.error)
      } else {
        ImageResizer.createResizedImage(res.uri, 200, 200, 'JPEG', 80) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
        .then((resizedImageUri) => {
          //this.SignUpInStore.setPhotoURL(resizedImageUri)
        }).catch((err) => {
           console.log(err)
        })
      }
    })
  }



  render() {
    return(
      <Album
        photos={ photos }
        photoOnPress={ this.openPicZoom }
        photoOnLongPress={ this.openPicOptions }
        footerOnPress={ this.openPicChoose }
        photoOnPressModal={ this.state.photoOnPressModal }
        onRequestPhotoOnPressModal={ this.closePicZoom }
      />
    )
  }
}

