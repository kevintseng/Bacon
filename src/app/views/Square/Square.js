import React from 'react'
import { View, Image, Text, TouchableHighlight } from 'react-native'

const Square = ({text,statu,onHideUnderlay,onShowUnderlay,onPress,imageSource, onPressimageSource}) => {

  return (
    <TouchableHighlight underlayColor={'transparent'} activeOpacity={1} onHideUnderlay={ onHideUnderlay } onShowUnderlay={ onShowUnderlay } onPress={ onPress }>
      <Image style={{justifyContent: 'flex-end',alignItems: 'center'}} source={ statu ? onPressimageSource : imageSource}>
        <View style={{marginBottom: 20}}>
          <Text>{ text }</Text>
        </View>
      </Image>
    </TouchableHighlight>
  )
}

export default Square