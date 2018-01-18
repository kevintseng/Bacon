import React, { Component } from 'react'
import { View, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = {
  view: {
    flex: 1
  }
}

export default class AboutMeEditScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  render() {
    return(
      <View style = {styles.view}>
        { this.props.content }
      </View>
    )
  }
}