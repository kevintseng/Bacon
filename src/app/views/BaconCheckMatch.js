import React from 'react'
import { Modal,Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { BarIndicator, SkypeIndicator } from 'react-native-indicators'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')

const styles = {
  textView: {
    position: 'absolute', 
    height, 
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  text: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    color: '#d63768',
    backgroundColor: 'transparent'
  },
  view: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'center'
  }
}


const BaconCheckMatch = ({visible,text}) => {

  return(
    <Modal animationType={"none"} transparent={true} visible={visible} onRequestClose={ () => {} } >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.view}
      >
        <SkypeIndicator
          count={6}
          color='#d63768'
        />
        <View style={styles.textView}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
     </Modal>
  )
}

export default BaconCheckMatch