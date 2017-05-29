import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
// API
// style => textStyle
// EditIconClicked => callback
const styles = {
  text: {
    color: '#2962FF'
  }
}
const EditIcon = (props) => {
  // API
  const { textstyle, text, onpress } = props

  //return
  return(
    <View>
      <TouchableHighlight onPress = { onpress }>
        <Text style = { [styles.text,textstyle] }>{ text }</Text>
      </TouchableHighlight> 
    </View>
  )
}

export { EditIcon }