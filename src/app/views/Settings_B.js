import React, { Component } from 'react'
import { View, Button } from 'react-native'
//import { Actions } from 'react-native-router-flux'

export default class Settings_B extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.fire
  }

  onPressSignOut = () => {
    this.firebase.auth().signOut()
    this.setOffline('EPZxOG4AjrQdfih5vHuWUKeVj2j1')
  }

  setOffline(user_id){
    this.firebase.database().ref("/online/" + user_id).remove()
  }

  render(){
    return(
      <View>
        <Button title= '登出' onPress={this.onPressSignOut}/>
      </View>
    )
  }
}
