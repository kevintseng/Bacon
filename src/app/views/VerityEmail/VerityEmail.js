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

const VerityEmail = ({ verity, verityText, onPress }) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={ styles.view }>
        <Image style={ styles.image } source={ verity ? require('./img/ico_meet_email_1.png') : require('./img/ico_aboutme_mail_0.png')}/>
        <Text style={ styles.text }>{ verityText }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VerityEmail