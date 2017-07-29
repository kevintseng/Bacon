import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
// custom components
import WelcomeContainer from '../containers/Welcome/WelcomeContainer'

export default class WelcomeScene extends Component {
  render(){
    return(
      <WelcomeContainer/>
    )
  }
}