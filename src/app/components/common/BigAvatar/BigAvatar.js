import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'

const { width } = Dimensions.get('window')

const picWidth = width/2

const styles = {
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

const BigAvatar = ({ imgSource, topButtonText, topButtonOnPress }) => {
  return(
    <View>
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
  )
}

export default BigAvatar