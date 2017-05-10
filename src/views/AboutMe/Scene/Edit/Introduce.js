import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

const styles = {
  Introduce : {
    flex: 1
  }
}
class Introduce extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    return(
      <View style = { styles.Introduce }> 
        <View>
          <Text>自我介紹</Text> 
        </View>
        <View>
          <TextInput
            //underlineColorAndroid = 'transparent'
            textAlignVertical = 'top'
            placeholder = "自我介紹"
            multiline = { true }
            autoCorrect = { true }
            numberOfLines = { 100 }
            //editable = { true }
            maxLength = {500}        
            onChangeText = { (text) => this.setState({ text }) }
            value = { this.state.text }
          /> 
        </View> 
      </View>
    )
  }
}

export default Introduce;