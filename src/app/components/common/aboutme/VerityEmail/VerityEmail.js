import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const VerityEmail = ({ VerityEmailText }) => {
  return(
    <TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{marginRight: 10}} source={require('./img/ico_aboutme_mail_0.png')}/>
        <Text>{ VerityEmailText }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VerityEmail