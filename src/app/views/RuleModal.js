import React from 'react'
import { View, Modal, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Rule from '../../configs/Policy'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 15,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    padding: 10
  },
  text: {
    padding: 10
  },
  bottomView: { 
    height: 50, 
    justifyContent: 'center' 
  },
  content: {
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    aspectRatio: 1.5,
    width: width*0.8,
    height: height*0.7,
    position: 'absolute',
    borderRadius: 15
  },
  policy: {
    justifyContent: 'space-between'
  }
}

const RuleModal = ({visible,onRequestClose}) => {
  return (
         <Modal animationType={"fade"} transparent={true} visible={visible} onRequestClose={ onRequestClose } >
          <View
            style={styles.view}
          >
            <View style={styles.content}
            >
              <View style={styles.policy}>
                <View>
                  <Text style={ styles.title }>個資保護政策</Text>
                </View>
                <ScrollView>
                  <Rule/>
                </ScrollView>
                <View style={styles.bottomView}>
                  <Text style={ styles.title } onPress={ onRequestClose }>我知道了</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
  )
}

export default RuleModal
