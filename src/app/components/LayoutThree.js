import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'
import { FormInput, CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Theme from './Theme/Theme'

const { width } = Dimensions.get('window'); //eslint-disable-line

const LayoutThree = ({ bottonText,buttonOnPress,returnOnPress,email,onChangeEmail,password,onChangePassword,displayName,onChangeDisplayName,birthday,onChangeBirthday }) => {
  return(
    <Theme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>
      <View style={{alignItems: 'center', marginBottom: 20}}>
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
            //ref='passw'
            underlineColorAndroid="#606060"
            placeholder='請輸入密碼'
            secureTextEntry
            maxLength={12}
            value={ password }
            onChangeText={onChangePassword}
            />
        </View>
        <View>
          <Image source={require('../../images/ico_logo_nn.png')}/>
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
          <Image source={require('../../images/ico_logo_bd.png')}/>
        </View>
        <View style={{marginTop: 10 }}>
          <DatePicker
            style={{alignSelf: 'center', width: width - 50, borderRadius: width - 50}}
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
    </Theme>
  )
}

export default LayoutThree