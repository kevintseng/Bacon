import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  buttonTextSingUp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  buttonTextSingIn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
}

const onPressSingUp = () => {
  Actions.SignUp({ type: 'reset' })
}

const onPressSingIn = () => {
  Actions.SignIn({ type: 'reset' })
}

const SignUpIn = () => {

  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 100}}>
      <View>
        <Image source={require('../../images/ic_index_logo.png')} />
      </View>
      <View>
        <Text style={styles.title}>遇見更多的她/他</Text>
      </View>
      <View style={{marginBottom: 20, alignItems: 'center'}}>
        <TouchableOpacity style={{paddingBottom: 15}} onPress={onPressSingUp}> 
          <Image style={{justifyContent: 'center'}} source={require('../../images/btn_index_join.png')}>
            <Text style={styles.buttonTextSingUp}>+ 免費加入</Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSingIn}> 
          <Image style={{justifyContent: 'center'}} source={require('../../images/btn_gredient.png')}>
            <Text style={styles.buttonTextSingIn}>登入</Text>
          </Image>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <Image source={require('../../images/pic_index_wave.png')} />
      </View>
    </View>
  )
}

export default SignUpIn