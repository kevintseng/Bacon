import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native'

const styles = {
  themeView: {
    flex: 1, 
    alignItems: 'center'
  },
  leftIconView: {
    position: 'absolute', 
    ...Platform.select({ 
      ios: { 
        top: 27
      }, 
      android: { 
        top: 20 
      } 
    }),
    left: 20
  },
  titlePicView: {
    position: 'absolute', 
    ...Platform.select({ 
      ios: { 
        top: 28
      }, 
      android: { 
        top: 21
      } 
    }),
  },
  titleTextView: {
    position: 'absolute', 
    ...Platform.select({ 
      ios: { 
        top: 23
      }, 
      android: { 
        top: 16
      } 
    })
  },
  titleText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#606060',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20
  },
  bottonView: {
    position: 'absolute', 
    bottom: 135,
  },
  buttonImage: {
    justifyContent: 'center'
  },
  bottonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    color: 'white', 
    fontWeight: '500',
    textAlign: 'center', 
    fontSize: 20
  },
  warningView:{
    position: 'absolute', 
    bottom: 105
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

const BaconTheme = ({ children, title, leftIconOnPress, bottonText, buttonOnPress, warningText, warningOnPress }) => {
  return(
    <View style={ styles.themeView }>

      <View style={ title ? styles.titleTextView : styles.titlePicView }>
        { title ? <Text style={ styles.titleText }>{ title }</Text> : <Image source={require('./img/ico_titlebar_logo.png')} /> }
      </View>

      <View style={ styles.leftIconView } >
        <TouchableOpacity activeOpacity={0.2} onPress={ leftIconOnPress } >
          <Image source={require('./img/btn_back.png')} />
        </TouchableOpacity>
      </View>

      { children }

      <View style={ styles.bottonView }>
        <TouchableOpacity onPress={ buttonOnPress }> 
          <Image style={ styles.buttonImage }source={require('./img/btn_gredient.png')}>
            <Text style={ styles.bottonText }>{ bottonText }</Text>
          </Image>
        </TouchableOpacity>
      </View>

      <View style={styles.warningView }>
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

BaconTheme.propTypes = {
  title: PropTypes.string,
  leftIconOnPress: PropTypes.func,
  bottonText: PropTypes.string,
  buttonOnPress: PropTypes.func,
  warningText: PropTypes.string,
  warningOnPress: PropTypes.func
}

export default BaconTheme