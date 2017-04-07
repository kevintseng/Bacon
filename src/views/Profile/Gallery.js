import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import PhotoGrid from 'react-native-photo-grid';
import Reactotron from 'reactotron-react-native';
import ImagePicker from 'react-native-customized-image-picker';
import { uploadImage } from '../../Utils';
import { Photo } from './Photo';

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

  renderItem(item, size = 123) {
    return(
      <Photo item={item} key={item.id} handleEditPhoto={() => {}} size={size} />
    )
  }


  render() {
    Reactotron.log(width);
    return(
      <View style={styles.viewWrapper}>
        <PhotoGrid
          style={styles.gallery}
          data = { this.state.items }
          itemsPerRow = { 3 }
          itemMargin = { 1 }
          renderItem = { this.renderItem }
        />
      </View>
    );
  }
}
