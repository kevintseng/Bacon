import React from 'react'
import { Dimensions, View, Text } from 'react-native'
import { SkypeIndicator } from 'react-native-indicators'

const { width, height } = Dimensions.get('window')

const styles = {
  textView: {
    position: 'absolute', 
    height, 
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  text: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 20,
    color: '#d63768',
    backgroundColor: 'transparent',
  },
  view: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingBottom: 110
  }
}

const BaconCheckChatRoom = ({text}) => {

  return(
      <View
        style={styles.view}
      >
          <SkypeIndicator
            count={6}
            color='#d63768'
          />
        <View style={styles.textView}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
  )
}

export default BaconCheckChatRoom