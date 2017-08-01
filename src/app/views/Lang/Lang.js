import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'

const Lang = observer(({ langName, check, onPressCheckBox}) => {
  return(
    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',borderBottomWidth: 1, borderBottomColor: '#b3b3b3', padding: 5, margin: 5}}>
      <Text style={{color: '#606060',fontSize: 16}}>{ langName }</Text>
      <TouchableOpacity onPress={ onPressCheckBox }>
        <Image source={ check ? require('./img/checkbox_reg_y.png') : require('./img/checkbox_reg_n.png') } />
      </TouchableOpacity>
    </View>
  
  )
})

export default Lang