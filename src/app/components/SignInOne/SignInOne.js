import React from 'react'
import { View, Image, Dimensions, Platform } from 'react-native'
import { FormInput } from 'react-native-elements'

import ButtonTheme from '../ButtonTheme/ButtonTheme'

const { width } = Dimensions.get('window')

const styles = {
  SignInOne: {
    alignItems: 'center',
    position: 'absolute', 
    top: 100
  },
  form: {
    ...Platform.select({ 
      ios: { 
        marginTop: 10
      }, 
      android: { 
        marginTop: 5
      } 
    })
  }
}

const SignInOne = ({ buttonText, buttonOnPress, warningText, warningOnPress, email, onChangeEmail, password, onChangePassword }) => {
  return(
    <ButtonTheme buttonText={ buttonText } buttonOnPress={ buttonOnPress } warningText={ warningText } warningOnPress={ warningOnPress }>
      
      <View style={ styles.SignInOne }>

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

        <View style={ styles.form }>
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

    </ButtonTheme>
  )
}

export default SignInOne