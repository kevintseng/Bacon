import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'

const styles = {
  success: {
    color: 'blue',
    fontSize: 12
  },
  failure: {
    color: 'red',
    fontSize: 12    
  }
}

const StatesMessage = ({state, message}) => {
  return(
    <View>
    {
      message &&
        <Text style={state ? styles.success : styles.failure }>
          { message }
        </Text>
    }
    </View>
  )
}

export default StatesMessage