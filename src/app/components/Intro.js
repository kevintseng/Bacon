import React from 'react'
import { View, Image, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const styles = {
  linearGradientView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    flex: 1
  }
}

const colors = ['#f4a764', '#d63768']

const Intro = ({UpInStatus,error}) => {

  const success = UpInStatus + '中'
  const failure = UpInStatus + '失敗'

  return(
    <LinearGradient colors={colors} style={styles.linearGradient}>
      <View style={styles.linearGradientView}>
        <Image source={require('../../images/ico_intro_logo.png')} />
        <Text style={{textAlign: 'center', marginTop: 20, color: "blue"}}>{ error ? failure : success }</Text>
        <Text style={{textAlign: 'center', marginTop: 20, color: "red"}}>{ error }</Text>
      </View>
    </LinearGradient>
  )
}

export default Intro