import React from 'react';
import { Image, TouchableOpacity } from 'react-native';


const Photo = (props) => {
  const { item, size, handleEditPhoto } = props;

  return (
    <TouchableOpacity
      key = { item.id }
      style = {{ width: size, height: size }}
      onPress = {handleEditPhoto}>
      <Image
        resizeMode = "cover"
        style = {{ width: size, height: size }}
        source = {{ uri: item.src }}
      />
    </TouchableOpacity>
  );
};

export { Photo };
