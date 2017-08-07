import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import UUIDGenerator from 'react-native-uuid-generator'

import Album from '../../views/Album/Album'

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
      key: null,
      uri: null,
      visible: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  openPicZoom = key => {
    this.setState({ key: key, uri: this.SubjectStore.album[key], visible: true})
  }

  closePicZoom = () => {
    this.setState({ visible: false })
  }

  setAvatar = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album').child(this.state.key).once('value',(snap) => {
      if (snap.val()) {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/avatar').set(snap.val())
      }
    })
    this.SubjectStore.setAvatar(this.state.uri)
    this.setState({ visible: false })
  }

  deletePhoto = () => {
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album').child(this.state.key).remove()
    this.SubjectStore.deletePhoto(this.state.key)
    this.setState({ visible: false })
  }

  openPicChoose = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        return
      } else if (res.error) {
        console.log(res.error)
      } else {
        ImageResizer.createResizedImage(res.uri, 1200, 1200, 'JPEG', 100) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
        .then((resizedUri) => {
          //UUIDGenerator.getRandomUUID((uuid) => {
            const uuid = Date.now()
            this.SubjectStore.addPhoto(uuid,resizedUri)
            this.firebase.storage().ref('userAlbum/' + this.SubjectStore.uid + '/' + uuid + '.jpg').putFile(resizedUri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album/' + uuid).set(uploadedFile.downloadUrl)
              //console.log(uploadedFile.downloadUrl)
            })
            .catch(err => {
              console.log(err)
            })
          //})
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
        photos={ this.SubjectStore.albumToFlatList }
        photoOnPress={ this.openPicZoom }
        footerOnPress={ this.openPicChoose }
        visible={ this.state.visible }
        onPressLeftButton={ this.closePicZoom }
        onPressMiddleButton={ this.setAvatar }
        onPressRightButton={ this.deletePhoto }
      />
    )
  }
}

