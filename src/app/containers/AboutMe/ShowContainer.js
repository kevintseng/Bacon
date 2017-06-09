import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react/native'
// views
import ShowView from "../../views/AboutMe/ShowView"

@inject("SubjectStore")
export default class ShowContainer extends Component {

  componentWillMount() {
    Actions.refresh({ key: 'drawer', open: false })
    this.props.SubjectStore.initAboutMeShow()
  }

  render() {
    return(
      <ShowView/>
    )
  }
}
