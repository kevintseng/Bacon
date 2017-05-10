import React, { Component } from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'

const styles = {
  CheckBox: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray'
  },
  checkBox : {
    backgroundColor: "#ffffff",
    borderWidth: 0
  },
  text: {
    flex: 0.95,
    backgroundColor: "#ffffff"
    //color: "#f0f0f0"
  }
}

const languages = ["中文","英文","日文","韓文"]

class Language extends Component {
  
  constructor(props) {
    super(props)

    this.object = new Object
    languages.forEach((langauge) => { this.object[langauge] = { checked: false } })
    this.state = this.object
    //this.state = languages.map((langauge) => { return { {langauge} : { checked: false } } });
  }
  //let firebase = this.props.fire

  onPress = (langauge) => {
    //this.setState({ checked: !this.state.checked })
    this.setState({ [langauge]: { checked: !this.state[langauge].checked } })
  }

  renderlanguages = () => {
    return languages.map((langauge) => { 
      return(
        <View key = { langauge } style = { styles.CheckBox }> 
         <CheckBox
            title = { langauge }
            iconRight
            //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
            containerStyle = { styles.checkBox }
            textStyle = { styles.text }
            checkedColor = 'red'
            //checked = { this.state.checked }
            //onPress = { this.onPress }
            checked = { this.state[langauge].checked }
            onPress = { () => this.onPress(langauge) }            
          />
        </View>
      ) 
    })
  }

  render(){
    return(
      <View>
        { this.renderlanguages() }
      </View>
    )
  }
}

export default Language;