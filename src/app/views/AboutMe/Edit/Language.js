import React, { Component } from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { observer, inject } from 'mobx-react/native'

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

@inject("UIStore") @observer
class Language extends Component {

  renderlanguages = () => {
    return Object.keys(this.props.UIStore.langRaw).map((langauge) => { 
      return(
        <View key = { langauge } style = { styles.CheckBox }> 
         <CheckBox
            title = { langauge }
            iconRight
            //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
            containerStyle = { styles.checkBox }
            textStyle = { styles.text }
            checkedColor = 'blue'
            //checked = { this.state.checked }
            //onPress = { this.onPress }
            checked = { this.props.UIStore.langRaw[langauge] }
            onPress = { () => this.props.UIStore.setLang(langauge) }            
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

export default Language