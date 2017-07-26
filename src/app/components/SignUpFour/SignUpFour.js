import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions, Platform } from 'react-native'

import ButtonTheme from '../ButtonTheme/ButtonTheme'

const { width } = Dimensions.get('window')

const picWidth = width/2

const styles = {
  SignUpFour: {
    alignSelf: 'center', 
    position: 'absolute', 
    top: 50
  },
  topButtonImage: {
    justifyContent: 'center'
  },
  topButtonText: {
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
  avatarImage: {
    alignSelf: 'center', 
    width: picWidth, 
    height: picWidth, 
    ...Platform.select({ 
      ios: { 
        borderRadius: picWidth/2
      }, 
      android: { 
        borderRadius: picWidth
      }
    })
  }
}

const SignUpFour = ({ imgSource, buttonText, buttonOnPress, topButtonText, topButtonOnPress }) => {
  return(
    <ButtonTheme buttonText={ buttonText } buttonOnPress={ buttonOnPress }>
      
      <View style={ styles.SignUpFour }>

        <View>
          <TouchableOpacity onPress={ topButtonOnPress }> 
            <Image style={ styles.topButtonImage } source={require('./img/btn_reg_blank.png')}>
              <Text style={ styles.topButtonText }> { topButtonText }</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.avatarView }>
          <Image 
            style={ styles.avatarImage }
            source={ imgSource ? { uri: imgSource } : require('./img/addImage.png')}       
          />
        </View> 

      </View>

    </ButtonTheme>
  )
}

export default SignUpFour