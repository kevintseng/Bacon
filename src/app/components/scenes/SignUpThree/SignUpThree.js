import React from 'react'
import { View, Image, Text, Dimensions, Platform } from 'react-native'
import { FormInput, CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import ButtonTheme from '../../common/ButtonTheme/ButtonTheme'

const { width } = Dimensions.get('window')

const styles = {
  SignUpThree:{
    alignItems: 'center', 
    position: 'absolute', 
    top: 10
  },
  form: {
    ...Platform.select({ 
      ios: { 
        marginTop: 15
      }, 
      android: { 
        marginTop: 5
      } 
    })
  },
  emailError: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: 20,
    top: 5,
    color: 'blue',
    fontSize: 12
  },
  passwordError: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: 20,
    top: 75,
    color: 'blue',
    fontSize: 12
  },
  displayNameError: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: 20,
    top: 147,
    color: 'blue',
    fontSize: 12
  },
  birthdayError: {
    position: 'absolute',
    top: 245,
    color: 'blue',
    fontSize: 12    
  },
  policyError: {
    position: 'absolute',
    bottom: 38,
    color: 'blue',
    fontSize: 12     
  }
}

const SignUpThree = ({ buttonText, buttonOnPress, email, onChangeEmail, onBlurEmail, password, onChangePassword, onBlurPassword, displayName, onChangeDisplayName, onBlurDisplayName, birthday, onChangeBirthday, emailError, passwordError, displayNameError, birthdayError,policyError, minDate, maxDate, policy, onPressPolicy}) => {
  return(
    <ButtonTheme buttonText={ buttonText } buttonOnPress={ buttonOnPress } >
      
      <View style={ styles.SignUpThree }>

        <View>
          <Image source={require('./img/ico_reg_mail.png')}/>
        </View>

        {
          emailError &&
          <Text style={styles.emailError}>
            { emailError }
          </Text>
        }

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
            onBlur={ onBlurEmail }
            onChangeText={ onChangeEmail }
          />
        </View>

        <View style={ styles.form }>
          <Image source={require('./img/ico_logo_pass.png')}/>
        </View>

        {
          passwordError &&
          <Text style={styles.passwordError}>
            { passwordError }
          </Text>
        }

        <View style={{width}}>
          <FormInput
            underlineColorAndroid="#606060"
            placeholder='請輸入6-10字英數密碼組合'
            secureTextEntry
            maxLength={12}
            value={ password }
            onBlur={ onBlurPassword }
            onChangeText={ onChangePassword }
            />
        </View>

        <View style={ styles.form }>
          <Image source={require('./img/ico_logo_nn.png')}/>
        </View>

        {
          displayNameError &&
          <Text style={ styles.displayNameError }>
            { displayNameError }
          </Text>
        }

        <View style={{width}}>
            <FormInput
              placeholder='請輸2個字以上的暱稱'
              underlineColorAndroid="#606060"
              returnKeyType={'next'}
              maxLength={20}
              value={ displayName }
              onBlur={ onBlurDisplayName }
              onChangeText={ onChangeDisplayName }
            />
        </View>

        <View style={ styles.form }>
          <Image source={require('./img/ico_logo_bd.png')}/>
        </View>

        {
          birthdayError &&
          <Text style={ styles.birthdayError }>
          { birthdayError }
          </Text>
        }

        <View style={{marginTop: 20}}>
          <Image source={require('./img/btn_index_join.png')}>
          <DatePicker
            style={{flex:1, width: width - 62, justifyContent: 'center', alignSelf: 'center' }}
            customStyles={{
              dateInput: {
                borderWidth: 0
              }
            }}
            date={ birthday }
            mode="date"
            placeholder={ birthday || '您的生日' }
            format="YYYY-MM-DD"
            minDate={ minDate }
            maxDate={ maxDate }
            confirmBtnText="完成"
            cancelBtnText="取消"
            showIcon={false}
            onDateChange={ onChangeBirthday }
          />
          </Image>
        </View>

        <View style={{flexDirection:'row',alignItems: 'center', position: 'relative', bottom: Platform.OS === 'ios' ? -8 : 7, right: 30}}>
          <View style={{position: 'relative', left: 35}}>
            <CheckBox
              //onBlur={this.termsCheck}
              title=''
              center
              containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
              checked={ policy }
              onPress={ onPressPolicy }
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{color: '#b3b3b3',fontSize: 12}}>我同意</Text>
            <Text style={{fontSize: 12}}>Bacon隱私權政策</Text>
            <Text style={{color: '#b3b3b3',fontSize: 12}}>及</Text>
            <Text style={{fontSize: 12}}>服務條款</Text>
          </View>
        </View>

        {
          policyError &&
          <Text style={ styles.policyError }>
          { policyError }
          </Text>
        }

      </View>

    </ButtonTheme>
  )
}

export default SignUpThree