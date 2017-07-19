import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Theme from './Theme'

const LayoutOne = ({ bottonText,buttonOnPress,returnOnPress,sexButtonLeftText, sexButtonRightText, sexButtonOnPress, intentionButtonLeftText, intentionButtonRightText, intentionButtonOnPress,sexChoose,intentionChoose,warning }) => {
  return(
    <Theme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>
      <View style={{marginTop: 70}}>
        <TouchableOpacity activeOpacity={0.2} onPress={ sexButtonOnPress }>
            <Image style={{justifyContent: 'center'}} source={sexChoose ? require('../../images/switcher_reg_sex_1.png') : require('../../images/switcher_reg_sex_2.png')}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{fontSize: 20, color: sexChoose ? 'white': '#606060'}}>{ sexButtonLeftText }</Text>
                <Text style={{fontSize: 20, color: sexChoose ? '#606060' : 'white'}}>{ sexButtonRightText }</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity activeOpacity={0.2} onPress={ intentionButtonOnPress }>
            <Image style={{justifyContent: 'center'}} source={intentionChoose ? require('../../images/switcher_reg_homo_1.png') : require('../../images/switcher_reg_homo_2.png')}>
             <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{fontSize: 20, color: intentionChoose ? 'white': '#606060'}}>{ intentionButtonLeftText }</Text>
                <Text style={{fontSize: 20, color: intentionChoose ? '#606060' : 'white'}}>{ intentionButtonRightText }</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 70}}>
          <Text style={{color: '#606060'}}> { warning }</Text>
        </View>
    </Theme>
  )
}

export default LayoutOne