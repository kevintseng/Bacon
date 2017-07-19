import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import Theme from './Theme'

const { width } = Dimensions.get('window')

const picWidth = width/2

const LayoutFour = ({ bottonText,buttonOnPress,returnOnPress,topBottonText }) => {
  return(
    <Theme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>
      
      <View>
        <TouchableOpacity > 
          <Image style={{justifyContent: 'center'}} source={require('../../images/btn_index_join.png')}>
            <Text style={{fontSize: 20, color: '#606060', textAlign: 'center', fontWeight: 'bold'}}> { topBottonText}</Text>
          </Image>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 60}}>
        <Image 
          style={{ alignSelf: 'center', width: picWidth, height: picWidth, borderRadius: picWidth }}
          source={require('../../images/avatar.jpg')}       
        />
      </View>   

    </Theme>
  )
}

export default LayoutFour