import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { FormInput } from 'react-native-elements'

import BaconTheme from '../BaconTheme/BaconTheme'

const { width } = Dimensions.get('window')

const SignIn = ({ bottonText, buttonOnPress, returnOnPress, email, onChangeEmail, password, onChangePassword, warningText, warningOnPress }) => {
  return(
    <BaconTheme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress } warningText={ warningText } warningOnPress={ warningOnPress }>
      
      <View style={{alignItems: 'center', marginTop: 165}}>

        <View>
          <Image source={require('./img/ico_reg_mail.png')}/>
        </View>

        <View style={{width}}>
          <FormInput
            underlineColorAndroid="#606060"
            autoFocus
            autoCorrect={false}
            placeholder='請輸入帳號(email)'
            returnKeyType={'next'}
            keyboardType={'email-address'}
            value={ email }
            maxLength={60}
            onChangeText={ onChangeEmail }
          />
        </View>

        <View style={{marginTop: 10}}>
          <Image source={require('./img/ico_logo_pass.png')}/>
        </View>

        <View style={{width}}>
          <FormInput
            //ref='passw'
            underlineColorAndroid="#606060"
            placeholder='請輸入6-10字英數密碼組合'
            secureTextEntry
            maxLength={12}
            value={ password }
            onChangeText={onChangePassword}
            />
        </View>

      </View>

    </BaconTheme>
  )
}

export default SignIn