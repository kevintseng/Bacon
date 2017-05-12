import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

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

//const E = {"中文": false, "英文": false}

class Language extends Component {
  
  constructor(props) {
    super(props)

    //this.object = new Object
    //this.props.languagesOptions.forEach((langauge) => { this.object[langauge] = { checked: false } })
    //this.state = this.object
    this.state = this.props.initcontent
    //Alert.alert("重新初始化")
    //this.state = languages.map((langauge) => { return { {langauge} : { checked: false } } });
  }
  //let firebase = this.props.fire

  _save = () => {
    this.props.save(this.state)
    Actions.aboutMeIndex()
  }

  componentWillMount = () => {
    Actions.refresh({rightTitle: "完成", onRight: this._save });
  }  

  onPress = (langauge) => {
    //this.setState({ checked: !this.state.checked })
    this.setState({ [langauge]: !this.state[langauge] })
  }

  renderlanguages = () => {
    //const myobject = {"中文": false, "英文": false}
    return Object.keys(this.state).map((langauge) => { 
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
            checked = { this.state[langauge] }
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