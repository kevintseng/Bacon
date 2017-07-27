import React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')

const ADD_IMAGE = require('Bacon/src/images/addImage.png')

const Cookie = ({ name, size, photoURL, onPressButton }) => {

const styles = {
  itemImageStyle: {
    width: size || width*0.3,
    height: size || width*0.3,
    marginBottom: 5,
    borderRadius: size ? size/2 : width*0.3/2,
  }
}

  return(
    <View style={{alignItems: 'center',margin: 5}}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressButton}>
        <Image source={ photoURL ? { uri: photoURL } : ADD_IMAGE } style={styles.itemImageStyle}/>
      </TouchableOpacity>
      <View>
        <Text lineBreakMode="tail" numberOfLines={1} >{ name }</Text>
      </View>
    </View>
  )
}

export default Cookie