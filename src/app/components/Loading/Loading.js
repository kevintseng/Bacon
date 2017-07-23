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
  },
  topText: {
    textAlign: 'center', 
    marginTop: 20, 
    color: "blue"
  },
  bottomText: {
    textAlign: 'center', 
    marginTop: 20, 
    color: "red"    
  }
}

const colors = ['#f4a764', '#d63768']

const Loading = ({ showWarning, UpInStatus, error }) => {

  const success = UpInStatus + '中'
  const failure = UpInStatus + '失敗'

  const renderText = () => (
    <View>
      <Text style={ styles.topText }>{ error ? failure : success }</Text>
      <Text style={ styles.bottomText }>{ error }</Text>
    </View>
  )

  return(
    <LinearGradient colors={colors} style={styles.linearGradient}>
      <View style={styles.linearGradientView}>
        <Image source={require('./img/ico_intro_logo.png')} />
        { showWarning && renderText() }
      </View>
    </LinearGradient>
  )
}

export default Loading