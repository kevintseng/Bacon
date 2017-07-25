import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

const styles = {
  welcomeView: {
    flex: 1, 
    alignItems: 'center', 
    //justifyContent: 'space-between'
  },
  logView: {
    position: 'absolute',
    top: 90
  },
  titleView: {
    position: 'absolute',
    top: 240
  },
  titleText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center'
  },
  buttonView: {
    position: 'absolute', 
    bottom: 190,
    alignItems: 'center',
  },
  topButtonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
  },
  bottomButtonText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  topButtonTouchable : {
    paddingBottom: 15
  },
  topButtonPic : {
    justifyContent: 'center'
  },
  bottomButtonPic: {
    justifyContent: 'center'
  },
  warningView:{
    position: 'absolute', 
    bottom: 160
  },
  warningText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060',
    fontSize: 10
  },
  bottomView: {
    position: 'absolute', 
    bottom: 0
  }
}

const Welcome = ({ title, topButtonText, bottomButtonText, topButtonOnPress, bottomButtonOnPress, warningText, warningOnPress }) => {

  return(
    <View style={ styles.welcomeView }>

      <View style={ styles.logView }>
        <Image source={require('./img/ic_index_logo.png')} />
      </View>

      <View style={ styles.titleView }>
        <Text style={ styles.titleText }>{ title }</Text>
      </View>

      <View style={ styles.buttonView }>
        <TouchableOpacity style={ styles.topButtonTouchable } onPress={ topButtonOnPress }> 
          <Image style={ styles.topButtonPic } source={require('./img/btn_index_join.png')} >
            <Text style={ styles.topButtonText }>{ topButtonText }</Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={ bottomButtonOnPress }> 
          <Image style={ styles.bottomButtonPic } source={require('./img/btn_gredient.png')} >
            <Text style={ styles.bottomButtonText }>{ bottomButtonText }</Text>
          </Image>
        </TouchableOpacity>
      </View>

      <View style={ styles.warningView }>
        <TouchableOpacity onPress={ warningOnPress }> 
          <Text style={ styles.warningText }>{ warningText }</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.bottomView }>
        <Image source={require('./img/pic_index_wave.png')} />
      </View>

    </View>
  )
}

export default Welcome
