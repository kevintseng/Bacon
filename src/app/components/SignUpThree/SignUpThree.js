import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'
import { FormInput, CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import BaconTheme from '../BaconTheme/BaconTheme'

const { width } = Dimensions.get('window')

const SignUpThree = ({ bottonText, buttonOnPress, returnOnPress, email, onChangeEmail, password, onChangePassword, displayName, onChangeDisplayName, birthday, onChangeBirthday }) => {
  return(
    <BaconTheme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>
      
      <View style={{alignItems: 'center', marginTop: 65}}>

        <View>
          <Image source={require('./img/ico_reg_mail.png')}/>
        </View>

        <View>
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

        <View>
          <Image source={require('./img/ico_logo_pass.png')}/>
        </View>

        <View>
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

        <View>
          <Image source={require('./img/ico_logo_nn.png')}/>
        </View>

        <View>
            <FormInput
              //ref='nickname'
              placeholder='請輸2個字以上的暱稱'
              //onBlur={this.nicknameCheck}
              underlineColorAndroid="#606060"
              returnKeyType={'next'}
              maxLength={20}
              value={ displayName }
              onChangeText={ onChangeDisplayName }
            />
        </View>

        <View>
          <Image source={require('./img/ico_logo_bd.png')}/>
        </View>

        <View style={{marginTop: 20}}>
          <Image source={require('./img/btn_reg_blank.png')}>
          <DatePicker
            style={{flex:1, width: width - 55,justifyContent: 'center' }}
            customStyles={{
              dateInput: {
                borderWidth: 0
              }
            }}
            date={birthday}
            mode="date"
            placeholder="您的生日"
            format="YYYY-MM-DD"
            minDate="1950-01-01"
            maxDate="2015-01-01"
            confirmBtnText="完成"
            cancelBtnText="取消"
            showIcon={false}
            onDateChange={onChangeBirthday}
          />
          </Image>
        </View>

        <View style={{flexDirection:'row',alignItems: 'center', marginRight: 60 }}>
          <View style={{position: 'relative', left: 35}}>
            <CheckBox
              //onBlur={this.termsCheck}
              title=''
              center
              containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
              checked={false}
              onPress={()=>{}}
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{color: '#b3b3b3'}}>我同意</Text>
            <Text>Bacon隱私權政策</Text>
            <Text style={{color: '#b3b3b3'}}>及</Text>
            <Text>服務條款</Text>
          </View>
        </View>

      </View>

    </BaconTheme>
  )
}

export default SignUpThree