import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      size: this.props.size,
    };
  }

  handlePressed = () => {
    this.props.func;
  }

  render() {
    const { item, size } = this.state;
    return (
      <TouchableOpacity
        key = { item.id }
        style = {{ width: size, height: size }}
        onPress = { this.handlePressed }>
        <Image
          resizeMode = "cover"
          style = {{ width: size, height: size }}
          source = {item.src}
        />
      </TouchableOpacity>
    );
  }
}
