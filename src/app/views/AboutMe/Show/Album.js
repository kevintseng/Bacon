import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button, } from 'react-native-elements';
import { observer, inject } from 'mobx-react/native';
import PhotoGrid from 'react-native-photo-grid';
import ImagePicker from 'react-native-customized-image-picker';
import Modal from 'react-native-simple-modal';
import { uploadImage, resizeImage } from '../../../Utils';


const {width, height} = Dimensions.get('window'); //eslint-disable-line
const ADD_IMAGE = require('hookup/src/images/addImage.png'); //eslint-disable-line
const PLACEHOLDER = require('hookup/src/images/cameraPlaceholder.jpg'); //eslint-disable-line
const styles = {
  viewWrapper: {
    width,
    flex: 1,
  },
  gallery: {
  },
  icon: {
    textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  photo: {
      flex: 1
  }
}
/*
const Album = () => {
  return(
    <View><Text>相簿施工中</Text></View>
  )
}

export default Album
*/
@inject("SubjectStore") @observer
export default class Album extends Component {
  constructor(props) {
    super(props)
    //this.store = this.props.store;
    //this.firebase = this.props.fire;
    //this.storage = this.props.storage;

    this.store = this.props.SubjectStore
    this.firebase = this.props.SubjectStore.firebase

    this.state = {
      items: [{ id: 'addImage', src: ADD_IMAGE }],
      photos: this.store.user.photos,
      showModal: false,
      currentItem: null,
    };
  }

  componentDidMount() {
    const newItems = this.state.items;
    console.log('items: ');
    console.log(newItems);
    console.log('user/photos: ');
    console.log(this.store.user.photos);
    if(this.store.user.photos) {
      this.store.user.photos.forEach(item => {
        newItems.push(item);
      });
      this.setState({
        items: newItems,
      });
      console.log('items: ');
      console.log(newItems);
    }
  }

  generateFilename = () => {
    return this.firebase.database().ref('users/' + this.store.user.uid + '/photos').push().key;
  }

  handlePressed = async photo => {
    console.log('Photo pressed');
    if(photo.id === 'addImage') {
      await ImagePicker.openPicker({
        multiple: true
      })
      .then( images => {
        images.forEach(async (image) => {
          const gallery = [];
          const filename = await this.generateFilename();
          const firebaseRefObj = this.firebase.storage().ref('userPhotos/' + this.store.user.uid + '/' + filename + '.jpg');
          // resizeImage(uri, width, height, mime, quality)
          const resizedUri = await resizeImage(image.path, 600, 600, image.mime, 80);
          const downloadUrl = await uploadImage(resizedUri, firebaseRefObj, image.mime);
          console.log(image);
          console.log('resizedUri: ' + resizedUri);
          console.log('downloadUrl: ' + downloadUrl);
          gallery.push({ id: filename, src: {uri: downloadUrl }});

          if(gallery.length == images.length) {
            // update state
            const arry = this.state.items.concat(gallery);
            this.setState({
              items: arry,
            });

            // update appstore and firebase
            let newGallery = gallery;
            if(this.store.user.photos) {
              newGallery = this.store.user.photos.concat(gallery);
            }
            // console.log('Print new gallery');
            // console.log(newGallery);
            this.store.setPhotos(newGallery);
            this.firebase.database().ref('users/' + this.store.user.uid + '/photos').set(newGallery);
          }
        });
      })
      .catch(err => {
        console.log(err.code);
      });
    } else {
      console.log('Real photo pressed');
      this.setState({
        showModal: true,
        currentItem: photo,
      });
    }
  }

  handleSetAvatar = () => {
    this.setState({showModal: false});
    const user = this.firebase.auth().currentUser;
    const photoURL = this.state.currentItem.src.uri;
    this.store.setAvatar(photoURL);
    this.firebase.database().ref('users/' + user.uid).update({photoURL})
    user.updateProfile({
      photoURL,
    }).then(() => {
      console.log('Update User Profile Succeed: ' + photoURL);
      this.setState({
        showModal: false
      });
    }, error => {
      console.error(error);
      console.log('Update User Profile failed: ' + photoURL);
      this.setState({
        showModal: false
      });
    });
  }

  handleDelete = () => {
    alert('哈, 刪照片功能還沒寫好');
  }

render() {
    return(
      <View style={styles.viewWrapper}>
        <PhotoGrid
          style={styles.gallery}
          data = { this.state.items }
          itemsPerRow = { 3 }
          itemMargin = { 1 }
          renderItem = { (item, size=123) => {
            return(
              <TouchableOpacity
                key = { item.id }
                style = {{ width: size, height: size }}
                onPress = {() => this.handlePressed(item)}
                >
                <Image
                  resizeMode = 'cover'
                  style = {{ width: size, height: size }}
                  source = {item.src}

                />
              </TouchableOpacity>
            );
          }}
        />
        <Modal
          open={this.state.showModal}
          offset={0}
          overlayBackground={'rgba(0, 0, 0, 0.75)'}
          animationDuration={200}
          animationTension={40}
          modalDidOpen={() => {console.log('modal open')}}
          modalDidClose={() => {this.setState({ showModal: false})}}
          closeOnTouchOutside
          containerStyle={{
            justifyContent: 'center'
          }}
          modalStyle={{
            borderRadius: 2,
            margin: 20,
            padding: 10,
            backgroundColor: '#F5F5F5'
          }}>
          <View>
              <Button
                title='X'
                buttonStyle={{ width: 50, height: 50, margin: 5, alignSelf: 'flex-end'}}
                onPress={() => this.setState({showModal: false})}
                backgroundColor={'gray'}
                />
              <Button
                title='將此照片設為頭像'
                backgroundColor={'green'}
                buttonStyle={{ margin: 5 }}
                onPress={this.handleSetAvatar}
                />
              <Button
                title='刪除此照片'
                backgroundColor={'red'}
                buttonStyle={{ margin: 5 }}
                onPress={this.handleDelete}
                />
          </View>
        </Modal>
      </View>
    );
  }
}