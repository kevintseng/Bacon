import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'

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

  _save = () => {
    this.props.save("這就是我的自我介紹")
    Actions.index()
  }

  componentWillMount = () => {
    Actions.refresh({rightTitle: "完成", onRight: this._save });
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