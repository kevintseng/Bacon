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

@inject('SubjectStore','firebase') @observer
export default class AlbumContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
    this.state = {
      uri: null,
      photoOnPressModal: false,
      photo: null
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  openPicZoom = url => {
    this.setState({ photoOnPressModal: true })
    this.setState({ uri: url })
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
            this.firebase.storage().ref('userAlbum/' + this.SubjectStore.uid + '/' + uuid + '.jpg').putFile(resizedUri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album/' + uploadedFile).set(true)
              //console.log(uploadedFile.downloadUrl)
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
        photos={ this.SubjectStore.albumShow }
        photoOnPress={ this.openPicZoom }
        photoOnLongPress={ this.openPicOptions }
        footerOnPress={ this.openPicChoose }
        photoOnPressModal={ this.state.photoOnPressModal }
        onRequestPhotoOnPressModal={ this.closePicZoom }
      />
    )
  }
}

