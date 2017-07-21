import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import BaconTheme from '../BaconTheme/BaconTheme'

const { width } = Dimensions.get('window')

const picWidth = width/2

const styles = {
  View: {
    marginTop: 100
  },
  topBottonText: {
    backgroundColor: 'transparent',
    fontFamily: 'NotoSans',
    letterSpacing: 3,
    fontSize: 20, 
    color: '#606060', 
    textAlign: 'center', 
    fontWeight: '500'    
  },
  avatarView: {
    marginTop: 30
  },
  avatar: {
    alignSelf: 'center', 
    width: picWidth, 
    height: picWidth, 
    borderRadius: picWidth
  }
}

const SignUpFour = ({ bottonText, buttonOnPress, returnOnPress, topBottonText }) => {
  return(
    <BaconTheme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>
      
      <View style={ styles.View }>

        <View>
          <TouchableOpacity > 
            <Image style={{justifyContent: 'center'}} source={require('./img/btn_reg_blank.png')}>
              <Text style={ styles.topBottonText }> { topBottonText }</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.avatarView }>
          <Image 
            style={ styles.avatar }
            source={require('./img/addImage.png')}       
          />
        </View> 

      </View>

    </BaconTheme>
  )
}

export default SignUpFour