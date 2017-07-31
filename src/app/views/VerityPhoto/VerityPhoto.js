import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const styles = {
  view: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  image: {
    marginRight: 10
  },
  text: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 12
  }
}

const VerityPhoto = ({ verity, verityText }) => {
  return(
    <TouchableOpacity>
      <View style={ styles.view }>
        <Image style={ styles.image } source={verity ? require('./img/ico_meet_picture_1.png') : require('./img/ico_aboutme_picture_0.png')}/>
        <Text style={ styles.text }>{ verityText }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VerityPhoto