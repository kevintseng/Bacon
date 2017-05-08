import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import ChangeColorButton from './ChangeColorButton'
import { Icon } from 'react-native-elements'

class Interests extends Component {

  constructor(props) {
    super(props)
    this.state = { showLists: [], defaultLists: ["旅遊","健身","逛街","美食","網購","遊戲","路跑","電影"] }
  }

  onKeyPress = () => {
    this.setState({ showLists: this.state.showLists.concat(this.state.text) })
  }

  renderButton = (list) => { return <ChangeColorButton key = { list } initButtonColor = "#ffffff" changedButtonColor = "#000000" initTextColor = "#696969" changedTextColor = "#ffffff" title = { list } /> }

  renderShowLists = () => {
    return this.state.showLists.map(this.renderButton)
  }

  renderdefaultLists = () => {
    return this.state.defaultLists.map(this.renderButton)
  }  

  render(){
    return(
      <View>
        <View>
          { this.renderShowLists() }
        </View>
        <View>
          <Icon name = "border-color" color = "#000000" size = { 20 } /> 
          <TextInput
            onSubmitEditing = { this.onKeyPress }     
            onChangeText = { (text) => this.setState({ text }) }
            value = { this.state.text }
          />      
        </View>
        <View>
          { this.renderdefaultLists() }
        </View>         
      </View>  
    )
  }
}

export default Interests;