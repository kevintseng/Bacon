import React from 'react'
import { Modal, TouchableOpacity,Dimensions, Image, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import BaconSwitch from './BaconSwitch/BaconSwitch'

const { width, height } = Dimensions.get('window')

const colors = ['rgba(244, 167, 100, 0.5)', 'rgba(214, 55, 104, 0.5)']

const styles = {
  View: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flex: 1,
    justifyContent: 'center'
  },
  TouchableOpacity: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    aspectRatio: 1.5,
    width,
    height: height*0.6,
    position: 'absolute',
    borderRadius: 15
  },
  linear: {
    justifyContent: 'space-between',
    width, 
    alignItems: 'center',
    paddingTop: 30, 
    paddingBottom: 30
  },
  titleView: {
    marginTop: 20
  },
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  bottom: {
    width, 
    flexDirection: 'row',
    marginTop: 50, 
    justifyContent: 'space-around'
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const BaconMatch = ({visible,onPressReturn,onPressBlank,onPressRight,onPressLeft}) => {

  return(
    <Modal animationType={"fade"} transparent={true} visible={visible} onRequestClose={ onPressReturn } >
      <TouchableOpacity
        activeOpacity={1}
        onPress={ onPressBlank }
        style={styles.View}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.TouchableOpacity}
        >
          <LinearGradient colors={colors} style={styles.linear}>
            <Image source={require('../../images/ico_meet_likeeo_heart.png')}/>
            <View style={styles.titleView}>
              <Text style={ styles.title }>太好了</Text>
              <Text style={ styles.title }>{'   你們互有好感！'}</Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={ onPressLeft }>
                <Image style={styles.left} source={require('../../images/btn_meet_keepswiping.png')}>
                  <Text style={ styles.text }>     回到緣分</Text>
                </Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={ onPressRight }>
                <Image style={styles.right} source={require('../../images/btn_meet_startchat.png')}>
                  <Text style={ styles.text }>     開始聊天</Text>
                </Image>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default BaconMatch