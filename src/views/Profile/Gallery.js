import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import PhotoGrid from 'react-native-photo-grid';
import Reactotron from 'reactotron-react-native';
import ImagePicker from 'react-native-customized-image-picker';
import { uploadImage, resizeImage } from '../../Utils';

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const ADD_IMAGE = require('../../images/addImage.png'); //eslint-disable-line
const PLACEHOLDER = require('../../images/cameraPlaceholder.jpg'); //eslint-disable-line
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
};

@observer
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.storage = this.props.storage;
    this.state = {
      items: [],
      loading: false,
    };
  }

  componentDidMount() {
    // Build an array of 60 photos
    // const items = Array.apply(null, Array(6)).map((v, i) => {
    //   return { id: i, src: 'https://placehold.it/200x200?text='+(i+1) }
    // });
    // this.setState({ items });
    const items = this.state.items;
    const gallery = this.store.user.photos;
    if(gallery) {
      gallery.forEach(item => {
        items.push(item);
      });
      this.setState({
        items,
        loading: false,
      });
    } else {
      this.setState({
        items: [{ id: 'addImage', src: ADD_IMAGE }],
      });
    }
  }

  generateFilename = () => {
    return this.firebase.database().ref('users/' + this.store.user.uid + '/photos').push().key;
  }

  handlePhotoPressed = async photo => {
    Reactotron.log('Photo pressed');
    Reactotron.log(photo);
    const gallery = [];
    if(photo.id === 'addImage') {
      this.setState({ loading: true });
      await ImagePicker.openPicker({
        multiple: true
      })
      .then( images => {
        images.forEach(async image => {
          const filename = await this.generateFilename();
          const firebaseRefObj = this.firebase.storage().ref('userPhotos/' + this.store.user.uid + '/' + filename + '.jpg');
          // resizeImage(uri, width, height, mime, quality)
          const resizedUri = await resizeImage(image.path, 600, 600, image.mime, 80);
          const downloadUrl = await uploadImage(resizedUri, firebaseRefObj, image.mime);
          Reactotron.log(image);
          Reactotron.log('resizedUri: ' + resizedUri);
          Reactotron.log('downloadUrl: ' + downloadUrl);
          gallery.push({ id: filename, src: {uri: downloadUrl }});
          if(gallery.length == images.length) {
            
            this.store.addPhotos(this.firebase, gallery);
            Reactotron.log('Print gallery');
            Reactotron.log(gallery);
          }
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        Reactotron.log(err.code);
      });
    }
  }


  render() {
    return(
      <View style={styles.viewWrapper}>
        {
          this.state.loading && <ActivityIndicator style={{ marginTop: 20 }} />
        }
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
                onPress = {() => this.handlePhotoPressed(item)}
                >
                <Image
                  resizeMode = "cover"
                  style = {{ width: size, height: size }}
                  source = {item.src}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
