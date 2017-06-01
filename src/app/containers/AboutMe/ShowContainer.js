import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
// views
import ShowView from "../../views/AboutMe/ShowView"

export default class ShowContainer extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'drawer', open: false })
  }

  render() {
    return(
      <ShowView/>
    )
  }
}
