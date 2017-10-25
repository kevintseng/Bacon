import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = {
  welcomeView: {
    flex: 1, 
    alignItems: 'center', 
  },
  logView: {
    flex: 8,
    //backgroundColor: 'red',
    justifyContent: 'center'
    //position: 'absolute',
    //top: 90
  },
  titleView: {
    //backgroundColor: 'blue',
    flex: 2,
    //justifyContent: 'center'
    //position: 'absolute',
    //top: 240
  },
  buttonView: {
    //backgroundColor: 'green',
    flex: 13,
    //position: 'absolute', 
    //bottom: 190,
    alignItems: 'center',
  },
  topButtonTouchable : {
    flex: 5
    //paddingBottom: 15
  },
  topButtonPic : {
    justifyContent: 'center'
  },
  buttonPic: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageView: {
    //flex: 1,
    //zIndex: 10,
    position: 'absolute',
    left: 100,
    //flex: 1,
    //backgroundColor: 'green'
  },
  textView: {
    //zIndex: 0,
    //flex: 1,
    //alignSelf: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'red'
  },
  warningView:{
    flex: 9
    //position: 'absolute', 
    //bottom: 160
  },
  bottomView: {
    position: 'absolute', 
    bottom: 0,
    //marginBottom: 320,
    //backgroundColor: 'red'
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
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
  warningText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060',
    fontSize: 10
  },
  titleText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center'
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
          <Image style={ styles.buttonPic } source={require('./img/btn_index_join.png')} >
            <View style={ styles.buttonContent }>
              <Image source={require('./img/ico_reg_plus.png')}/>
              <Text style={ styles.topButtonText }>{ topButtonText }</Text>
            </View>
          </Image>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.topButtonTouchable } onPress={ bottomButtonOnPress }> 
          <Image style={ styles.buttonPic } source={require('./img/btn_gredient.png')} >
            <View style={ styles.buttonContent }>
              <Image source={require('./img/btn_index_login.png')}/>
              <Text style={ styles.bottomButtonText }>{ bottomButtonText }</Text>
            </View>
          </Image>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.warningView } onPress={ warningOnPress }> 
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
