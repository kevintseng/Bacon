import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const VerityPhoto = ({ VerityPhotoText }) => {
  return(
    <TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{marginRight: 10}} source={require('./img/ico_aboutme_picture_0.png')}/>
        <Text>{ VerityPhotoText }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VerityPhoto