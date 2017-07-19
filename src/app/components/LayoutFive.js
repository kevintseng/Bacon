import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { FormInput } from 'react-native-elements'

const styles = {
  botton: {
    fontSize: 20, 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold'    
  }

}

const LayoutFive = ({ bottonText,buttonOnPress,returnOnPress,email,onChangeEmail,password,onChangePassword,subTitle,subTitleOnPress }) => {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>

      <View style={{marginTop: 20}}>
        <Image source={require('../../images/ico_titlebar_logo.png')} />
      </View>

      <View style={{position: 'absolute', top: 20, left: 20}}>
        <TouchableOpacity activeOpacity={0.2} onPress={returnOnPress} >
          <Image source={require('../../images/btn_back.png')} />
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', paddingBottom: 15}}>
        <View>
          <Image source={require('../../images/ico_reg_mail.png')}/>
        </View>
        <View style={{paddingBottom: 15}}>
          <FormInput
            underlineColorAndroid="#606060"
            autoFocus
            autoCorrect={false}
            placeholder='sample@email.com'
            returnKeyType={'next'}
            keyboardType={'email-address'}
            value={ email }
            maxLength={60}
            onChangeText={ onChangeEmail }
          />
        </View>
        <View>
          <Image source={require('../../images/ico_logo_pass.png')}/>
        </View>
        <View>
          <FormInput
            underlineColorAndroid="#606060"
            placeholder='請輸入密碼'
            secureTextEntry
            maxLength={12}
            value={ password }
            onChangeText={ onChangePassword }
            />
        </View>
      </View>

      <View style={{position: 'absolute', bottom: 120 }}>
        <TouchableOpacity onPress={ buttonOnPress }> 
          <Image style={{justifyContent: 'center'}} source={require('../../images/btn_gredient.png')}>
            <Text style={ styles.botton }>{ bottonText }</Text>
          </Image>
        </TouchableOpacity>
      </View>

      <View>
        <Text onPress={ subTitleOnPress }>{ subTitle }</Text>
      </View>

      <View>
        <Image source={require('../../images/pic_index_wave.png')} />
      </View>

    </View>
  )
}

export default LayoutFive