import React from 'react'
import { Modal,Dimensions, View, Text } from 'react-native'
import { BarIndicator } from 'react-native-indicators'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    position: 'absolute', 
    height, 
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  text: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    //fontSize: 18,
    fontWeight: '500',
    //color: '#606060',
    backgroundColor: 'transparent'
  }
}

const BaconCheckMatch = ({visible}) => {

  return(
            <Modal animationType={"fade"} transparent={true} visible={visible} onRequestClose={ () => {} } >
                <BarIndicator
                  count={6}
                  color='#d63768'
                />
              <View style={styles.view}>
                <Text style={styles.text}>檢查配對中</Text>
              </View>
            </Modal>
  )
}

export default BaconCheckMatch