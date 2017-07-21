import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import BaconTheme from '../BaconTheme/BaconTheme'

const styles = {
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

const SignUpOne = ({ bottonText, buttonOnPress, returnOnPress, sexButtonLeftText, sexButtonRightText, sexButtonOnPress, intentionButtonLeftText, intentionButtonRightText, intentionButtonOnPress, sexChoose, intentionChoose, warning }) => {
  return(
    <BaconTheme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>

      <View style={{marginTop: 120}}>

        <View>
          <TouchableOpacity activeOpacity={0.2} onPress={ sexButtonOnPress }>
              <Image style={{justifyContent: 'center'}} source={sexChoose ? require('./img/switcher_reg_sex_1.png') : require('./img/switcher_reg_sex_2.png')}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: sexChoose ? 'white': '#606060'}}>{ sexButtonLeftText }</Text>
                  <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: sexChoose ? '#606060' : 'white'}}>{ sexButtonRightText }</Text>
                </View>
              </Image>
            </TouchableOpacity>
        </View>

        <View style={{marginTop: 40}}>
          <TouchableOpacity activeOpacity={0.2} onPress={ intentionButtonOnPress }>
            <Image style={{justifyContent: 'center'}} source={intentionChoose ? require('./img/switcher_reg_homo_1.png') : require('./img/switcher_reg_homo_2.png')}>
             <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: intentionChoose ? 'white': '#606060'}}>{ intentionButtonLeftText }</Text>
                <Text style={{alignSelf:'center',backgroundColor: 'transparent',fontFamily: 'NotoSans', color: intentionChoose ? '#606060' : 'white'}}>{ intentionButtonRightText }</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={ styles.warningText }>{ warning }</Text>
        </View>

      </View>

    </BaconTheme>
  )
}

export default SignUpOne