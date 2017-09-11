import React from 'react'
import { View, Text } from 'react-native'

const styles = {
  view: {
    width: 150
  },
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
    <View style={ styles.view }>
    {
      message && !state &&
        <Text style={state ? styles.success : styles.failure }>
          { message }
        </Text>
    }
    </View>
  )
}

export default StatesMessage