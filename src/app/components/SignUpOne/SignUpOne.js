import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import ButtonTheme from '../ButtonTheme/ButtonTheme'

const styles = {
  SignUpOneView: {
    alignSelf: 'center',
    position: 'absolute', 
    top: 120
  },
  sexOrientationView: {
    marginTop: 40
  },
  warningView: {
    marginTop: 20
  },
  warningText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060',
    fontSize: 10
  }
}

const SignUpOne = ({ buttonText, buttonOnPress, genderButtonLeftText, genderButtonRightText, genderButtonOnPress, sexOrientationButtonLeftText, sexOrientationButtonRightText, sexOrientationButtonOnPress, gender, sexOrientation, warningText }) => {
  return(
    <ButtonTheme buttonText={ buttonText } buttonOnPress={ buttonOnPress } >

      <View style={ styles.SignUpOneView }>

        <View>
          <TouchableOpacity activeOpacity={1} onPress={ genderButtonOnPress }>
              <Image style={{justifyContent: 'center'}} source={gender ? require('./img/switcher_reg_sex_1.png') : require('./img/switcher_reg_sex_2.png')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: gender ? 'white': '#606060'}}>{ genderButtonLeftText }</Text>
                  <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: gender ? '#606060' : 'white'}}>{ genderButtonRightText }</Text>
                </View>
              </Image>
            </TouchableOpacity>
        </View>

        <View style={ styles.sexOrientationView }>
          <TouchableOpacity activeOpacity={1} onPress={ sexOrientationButtonOnPress }>
            <Image style={{justifyContent: 'center'}} source={sexOrientation ? require('./img/switcher_reg_homo_1.png') : require('./img/switcher_reg_homo_2.png')}>
             <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: sexOrientation ? 'white': '#606060'}}>{ sexOrientationButtonLeftText }</Text>
                <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: sexOrientation ? '#606060' : 'white'}}>{ sexOrientationButtonRightText }</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.warningView }>
          <Text style={ styles.warningText }>{ warningText }</Text>
        </View>

      </View>

    </ButtonTheme>
  )
}

export default SignUpOne