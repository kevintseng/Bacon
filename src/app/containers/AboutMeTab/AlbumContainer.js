import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import UUIDGenerator from 'react-native-uuid-generator'

import Album from '../../views/Album'

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

const metadata = {
    contentType: 'image/jpeg'
}

@inject('firebase','SubjectStore') @observer
export default class AlbumContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      uri: null,
      photoOnPressModal: false,
      photo: null
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  openPicZoom = key => {
    this.setState({ photoOnPressModal: true })
    this.setState({ uri: this.SubjectStore.photos[key] })
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

  //generateFilename = () => {
  //  return this.firebase.database().ref('users/' + this.SubjectStore.uid + '/photos').push().key
  //}

  openPicChoose = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        return
      } else if (res.error) {
        console.log(res.error)
      } else {
        ImageResizer.createResizedImage(res.uri, 1200, 1200, 'JPEG', 100) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
        .then((resizedUri) => {
          this.SubjectStore.addPhoto(resizedUri)
          UUIDGenerator.getRandomUUID((uuid) => {
            this.firebase.storage().ref('userPhotos/' + this.SubjectStore.uid + '/' + uuid + '.jpg').putFile(resizedUri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              this.firebase.database().ref('users/' + this.SubjectStore.uid + '/photos/' + this.SubjectStore.photos.length).set(uploadedFile.downloadUrl)
              console.log(uploadedFile.downloadUrl)
            })
            .catch(err => {
              console.log(err)
            });
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }

  render() {
    return(
      <Album
        source={ this.state.uri }
        photos={ this.SubjectStore.simplePhotos }
        photoOnPress={ this.openPicZoom }
        photoOnLongPress={ this.openPicOptions }
        footerOnPress={ this.openPicChoose }
        photoOnPressModal={ this.state.photoOnPressModal }
        onRequestPhotoOnPressModal={ this.closePicZoom }
      />
    )
  }
}

