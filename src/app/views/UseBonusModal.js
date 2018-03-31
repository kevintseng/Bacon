import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, Modal } from 'react-native'
//import CircleImage from 'react-native-bacon-circle-image'
import BaconRedButton from './BaconRedButton/BaconRedButton'

const { width, height } = Dimensions.get('window')

const styles = {
  TouchableOpacity: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    aspectRatio: 1.5,
    width: width*0.8,
    height: height*0.45,
    position: 'absolute',
    borderRadius: 15
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 22,
    //fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    //paddingBottom: 10    
  },
  middleTextView: {
    //backgroundColor: 'blue',
    borderBottomWidth: 1,
    paddingBottom: 20,
    width: width*0.7
  },
  bottomTextView: {
    marginTop: 20
  },
  topTextView: {
    margin: 10
  },
  BaconRedButton: {
    marginTop: 30,
    marginBottom: 10
  }
}

const UseBonusModal = ({visible,nowBonus,useBonus,routesOnPress,onRequestClose}) => {
  return (
      <Modal animationType={"none"} transparent={true} visible={visible} onRequestClose={ onRequestClose } >
          <TouchableOpacity
            activeOpacity={1}
            onPress={ onRequestClose }
            style={styles.TouchableOpacity}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.content}
            >
            <View style={styles.topTextView}>
              <Text style={styles.text}>{'目 前  ' + nowBonus + '  點'}</Text>
            </View>
            <View style={styles.middleTextView}>
              <Text style={styles.text}>{'使 用  ' + useBonus + '  點'}</Text>
            </View>
            <View style={styles.bottomTextView}>
              <Text style={styles.text}>{'剩 餘  ' + (nowBonus - useBonus) + '  點'}</Text>
            </View>
            <View style={styles.BaconRedButton}>
              <BaconRedButton
                confirm
                routesText='確定'
                routesOnPress={routesOnPress}
              />
            </View>
  
          </TouchableOpacity>
        </TouchableOpacity>

      </Modal>
  )
}

export default UseBonusModal
