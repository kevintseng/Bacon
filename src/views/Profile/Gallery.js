import React, { Component } from 'react';
import { Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import PhotoGrid from 'react-native-photo-grid';
import Reactotron from 'reactotron-react-native';
import ImagePicker from 'react-native-customized-image-picker';
import { uploadImage } from '../../Utils';

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const ADD_IMAGE = require('../../images/addImage.png'); //eslint-disable-line
const PLACEHOLDER = require('../../images/cameraPlaceholder.jpg'); //eslint-disable-line
const styles = {
  viewWrapper: {
    width: width - 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
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
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.storage = this.props.storage;
    this.state = {
      items: [],
      // items: [{ id: 'addImage', src: ADD_IMAGE }],
    };
  }

  componentDidMount() {
    // Build an array of 60 photos
    const items = Array.apply(null, Array(6)).map((v, i) => {
      return { id: i, src: 'https://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  renderItem(item, itemSize = 200) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {

        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }


  render() {
    Reactotron.log(this.state.items);
    return(
      <PhotoGrid
        style={styles.wrapperStyle}
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderItem = { this.renderItem }
      />
    );
  }
}
