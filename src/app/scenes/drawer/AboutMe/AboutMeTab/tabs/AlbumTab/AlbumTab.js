import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'

import Album from '../../../../../../views/Album/Album'

const options = {
  title: '請上傳一張大頭照',
  takePhotoButtonTitle: '使用相機現場拍一張',
  chooseFromLibraryButtonTitle: '從相簿中選擇',
  cancelButtonTitle: '取消',
  mediaType: 'photo',
  maxWidth: 600,
  maxHeight: 600,
  quality: 1.0,
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
export default class AlbumTab extends Component {

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
    if (this.SubjectStore.avatar === this.SubjectStore.album[this.state.key]) {
      Alert.alert( 
        '管理員提示', '大頭照無法刪除，請先設置其他大頭照', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
    } else {
      this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album').child(this.state.key).remove()
      this.SubjectStore.deletePhoto(this.state.key)
      this.setState({ visible: false })
    }
  }

  openPicChoose = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        return
      } else if (res.error) {
        console.log(res.error)
      } else {
        ImageResizer.createResizedImage(res.uri, 600, 600, 'JPEG', 100) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
        .then((image) => {
          //UUIDGenerator.getRandomUUID((uuid) => {
            const uuid = Date.now()
            this.SubjectStore.addPhoto(uuid,image.uri)
            this.firebase.storage().ref('userAlbum/' + this.SubjectStore.uid + '/' + uuid + '.jpg').putFile(image.uri.replace('file:/',''), metadata)
            .then(uploadedFile => {
              this.firebase.database().ref('users/' + this.SubjectStore.uid + '/album/' + uuid).set(uploadedFile.downloadURL)
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

