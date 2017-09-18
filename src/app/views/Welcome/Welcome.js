import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = {
  welcomeView: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'space-between'
  },
  logView: {
    marginTop: height == 480 ? 30 : 90
  },
  titleView: {
    marginTop: 5,
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
    marginTop: 5,
    alignItems: 'center',
  },
  topButtonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    //fontWeight: '500',
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  warningView:{
    marginTop: 5,
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
    width,
    position: 'absolute',
    bottom: 0,
    //width,
    //backgroundColor: 'blue',
    //alignSelf: 'center',
    //alignItems: 'center',
    //padding: 0,
    //margin: 0
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
            <Image style={{marginRight: 10}}source={require('./img/btn_index_login.png')}/>
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

//btn_index_login
