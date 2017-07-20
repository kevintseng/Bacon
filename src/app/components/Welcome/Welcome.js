import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

const styles = {
  welcomeView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 100
  },
  title: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  buttonView: {
    marginBottom: 20, 
    alignItems: 'center',
  },
  topButtonText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  bottomButtonText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  bottomLog: {
    marginTop: 20
  },
  topButtonTouchable : {
    paddingBottom: 15
  },
  topButtonPic : {
    justifyContent: 'center'
  },
  bottomButtonPic: {
    justifyContent: 'center'
  }
}

const Welcome = ({ title,topButtonText,bottomButtonText,topButtonOnPress,bottomButtonOnPress }) => {

  return(
    <View style={ styles.welcomeView }>
      <View>
        <Image source={require('./img/ic_index_logo.png')} />
      </View>
      <View>
        <Text style={ styles.title }>{ title }</Text>
      </View>
      <View style={ styles.buttonView }>
        <TouchableOpacity style={ styles.topButtonTouchable } onPress={ topButtonOnPress }> 
          <Image style={ styles.topButtonPic } source={require('./img/btn_reg_blank.png')} >
            <Text style={ styles.topButtonText }>{ topButtonText }</Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={ bottomButtonOnPress }> 
          <Image style={ styles.bottomButtonPic } source={require('./img/btn_gredient.png')} >
            <Text style={ styles.bottomButtonText }>{ bottomButtonText }</Text>
          </Image>
        </TouchableOpacity>
      </View>
      <View style={ styles.bottomLog }>
        <Image source={require('./img/pic_index_wave.png')} />
      </View>
    </View>
  )
}

export default Welcome
