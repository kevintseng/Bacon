import React, { Component } from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = {
  Introduce : {
    flex: 1
  }
}
class Introduce extends Component {
  
  constructor(props) {
    super(props)
    this.state = { text : this.props.initcontent }
    //Alert.alert("重新初始化")
  }

  _save = () => {
    this.props.save(this.state.text)
    Actions.aboutMeIndex({type: 'reset'})
  }

  componentWillMount = () => {
    Actions.refresh({title: "自我介紹", rightTitle: "完成", onRight: this._save });
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
            placeholder = { this.state.text }
            multiline = { true }
            autoCorrect = { true }
            numberOfLines = { 100 }
            //editable = { true }
            maxLength = { 500 }        
            onChangeText = { (text) => this.setState({ text }) }
            value = { this.state.text }
          /> 
        </View> 
      </View>
    )
  }
}

export default Introduce;