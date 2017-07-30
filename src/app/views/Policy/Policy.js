import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'

const { width } = Dimensions.get('window')

const Policy = ({check, onPressCheckBox,onPressPolicy, onPressRule}) => {
  return(
    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={ onPressCheckBox }>
        <Image source={ check ? require('./img/checkbox_reg_y.png') : require('./img/checkbox_reg_n.png') } />
      </TouchableOpacity>
      <Text style={{color: '#b3b3b3',fontSize: 12}}>我同意</Text>
      <Text style={{fontSize: 12}} onPress={ onPressPolicy }>Bacon隱私權政策</Text>
      <Text style={{color: '#b3b3b3',fontSize: 12}}>及</Text>
      <Text style={{fontSize: 12}} onPress={ onPressRule }>服務條款</Text>
    </View>
  )
}

export default Policy