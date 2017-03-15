//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import ImagePicker from 'react-native-customized-image-picker';

const defaultImage = require('../images/addImage.png');
const placeholder = require('../images/cameraPlaceholder.jpg');

const {width, height} = Dimensions.get('window');

const styles = {
  viewWrapper: {
    width,
    height,
  },
  container: {
      flex: 1,
      flexDirection: 'row',
  },
  gallery: {
      flexDirection: 'row'
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
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
    this.state = {
      size: {
          width,
          height
      },
      tip: null,
      items: [{ id: 'addImage', src: defaultImage }],
    };
  }

  componentDidMount() {
    Reactotron.log('Profile rendered');
    Actions.refresh({ key: 'drawer', open: false });
    // Build an array of 60 photos
  }

  getPhotosFromLocal = () => {

  }

  savePhotosToLocal= (items) => {
    return items;
  }

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  renderHeader = () => {
    return;
  }

  renderGallery = (items, itemSize) => {
    const pairs = this.getPairsArray(items);
    return pairs.map((item, index) => {
      return (
        <View style={styles.item} key={index}>
          <TouchableOpacity
            key = { item[0].id }
            style = {{ flex: 1, margin: 1, width: itemSize, height: itemSize }}
            onPress = { () => {
              if(item[0].id === 'addImage') {
                ImagePicker.openPicker({
                  cropping: true,
                  compressQuality: 80,
                  multiple: true,
                  width: 800,
                  height: 800,
                }).then(images => {
                  Reactotron.log(images);

                });
              }
            }}>
            <Image
              resizeMode='cover'
              defaultSource={placeholder}
              style={{ flex: 1, width: itemSize, height: itemSize }}
              source={item[0].src} />
          </TouchableOpacity>
          <TouchableOpacity
            key = { item[1].id }
            style = {{ flex: 1, margin: 1, width: itemSize, height: itemSize }}
            onPress = { () => {

            }}>
            <Image
              resizeMode='cover'
              defaultSource={placeholder}
              style={{ flex: 1, width: itemSize, height: itemSize }}
              source={item[1].src} />
          </TouchableOpacity>
        </View>
      );
    });
  }

  getPairsArray(photos) {
    let pa = photos;
    let pairs_r = [];
    let pairs = [];
    let count = 0;
    // Fill up array with placeholder images
    while(photos.length < 6) {
      pa.push({ id: 'placeholder' + photos.length, src: placeholder });
    }
    pa.forEach((item) => {
      count += 1;
      pairs.push(item);
      if(count == 2){
        pairs_r.push(pairs)
        count = 0;
        pairs = [];
      }
    });
    return pairs_r;
  }

  render() {
    const user = this.store.user;
    // const userImg = {uri: user.photoURL};
    const emailVerified = user.emailVerified ? {name: 'beenhere', color: 'skyblue'} : {name: 'report', color: 'orange'};

    return(
      <View style={styles.viewWrapper}>
        <Card
          containerStyle={{ flex: 1, width: this.state.size.width, margin: 0 }}
          wrapperStyle={{ flex: 1 }}
          >
          <ListItem
            key={user.email}
            title='Email'
            subtitle={user.email}
            rightTitle={this.state.tip}
            rightIcon={emailVerified}
            onPress={this.emailPressed}
            />
          <View style={{ height: 240, }}>
              <ScrollView
                horizontal
                >
                  {
                    this.renderGallery(this.state.items, 120)
                  }
              </ScrollView>
            </View>

        </Card>
      </View>
    );
  }
}
