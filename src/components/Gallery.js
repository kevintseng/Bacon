import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Image,
} from 'react-native';

// import { Button, Icon } from 'react-native-elements';

const styles = {
  container: {
      flex: 1,
      flexDirection: 'column',
      height: 260,
  },
  gallery: {
      flexDirection: 'column'
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  photo: {
      flex: 1
  }
}

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    const defaultImage = require('../images/addImage.png');
    this.state = {
        photos: [
            {
                label: 'beach',
                src: defaultImage
            },
            {
                label: 'bridge',
                src: defaultImage
            },
            {
                label: 'fields',
                src: defaultImage
            },
            {
                label: 'mountains',
                src: defaultImage
            },
            {
                label: 'sunflower',
                src: defaultImage
            },
            {
                label: 'sunset',
                src: defaultImage
            },
            {
                label: 'lake',
                src: defaultImage
            },
            {
                label: 'nature',
                src: defaultImage
            },
            {
                label: 'pink',
                src: defaultImage
            },
            {
                label: 'rails',
                src: defaultImage
            },
        ]
    };
  }

  getPairsArray(photos) {
    let pairs_r = [];
    let pairs = [];
    let count = 0;
    photos.forEach((item) => {
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

  renderGallery = () => {
    const pairs = this.getPairsArray(this.state.photos);
    return pairs.map((item, index) => {
      return (
        <View style={styles.item} key={index}>
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.photo}
            source={item[0].src} />
          <Image
            resizeMode={Image.resizeMode.cover}
            style={styles.photo}
            source={item[1].src} />
        </View>
      );
    });
  }

  render() {
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.gallery}>
                { this.renderGallery }
            </ScrollView>
        </View>
    );
  }
}
