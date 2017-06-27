import React from 'react'
import { View, Text, TextInput, Platform, Dimensions } from 'react-native'
import { observer, inject } from 'mobx-react/native'

const { width, height } = Dimensions.get('window')

const styles = {
  Introduce : {
    ...Platform.select({
      ios:{
        paddingTop: 10
      },
      android:{
        flex: 1
      }
    })
  },
  TextInput:{
    ...Platform.select({
      ios:{
        height, 
        width
      },
      android:{
      }
    })
  }
}
const Introduce = inject("UIStore")(observer(({ UIStore }) => {
  return(
    <View style = { styles.Introduce }> 
      <View>
        <Text>自我介紹</Text> 
      </View>
      <View>
        <TextInput
          style={styles.TextInput}
          //underlineColorAndroid = 'transparent'
          textAlignVertical = 'top'
          //placeholder = { UIStore.bio }
          multiline
          autoCorrect
          numberOfLines = { 100 }
          //editable = { true }
          maxLength = { 500 }        
          onChangeText = { (text) => UIStore.setBio(text) }
          value = { UIStore.bio }
        /> 
      </View> 
    </View>
  )
}))

export default Introduce