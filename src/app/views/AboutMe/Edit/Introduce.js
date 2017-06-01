import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { observer, inject } from 'mobx-react/native'


const styles = {
  Introduce : {
    flex: 1
  }
}
const Introduce = inject("SubjectStore")(observer(({ SubjectStore }) => {
  return(
    <View style = { styles.Introduce }> 
      <View>
        <Text>自我介紹</Text> 
      </View>
      <View>
        <TextInput
          //underlineColorAndroid = 'transparent'
          textAlignVertical = 'top'
          placeholder = { SubjectStore.bio }
          multiline
          autoCorrect
          numberOfLines = { 100 }
          //editable = { true }
          maxLength = { 500 }        
          onChangeText = { (text) => SubjectStore.setBio(text) }
          value = { SubjectStore.bio }
        /> 
      </View> 
    </View>
  )
}))

export default Introduce