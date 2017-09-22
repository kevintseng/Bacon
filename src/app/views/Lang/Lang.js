import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'

const styles = {
  text: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    color: '#b3b3b3',
    backgroundColor: 'transparent'    
  }
}

const Lang = observer(({ langName, check, onPressCheckBox }) => {

  const master = () => {
    switch(check) {
        case 0:
            return ''
            break;
        case 1:
            return '(一般)'
            break;
        case 2:
            return '(普通)'
            break;
        case 3:
            return '(精通)'
            break;
        default:
            return ''
    }     
  }

  return(
    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',borderBottomWidth: 1, borderBottomColor: '#b3b3b3', padding: 5, margin: 5}}>
      <Text style={{color: '#606060',fontSize: 16}}>{ langName }</Text>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>{' ' + master() + ' '}</Text>
        <TouchableOpacity onPress={ onPressCheckBox }>
          <Image source={ check === 0 ? require('./img/checkbox_reg_n.png') : require('./img/checkbox_reg_y.png') } />
        </TouchableOpacity>
      </View>
    </View>
  
  )
})

export default Lang