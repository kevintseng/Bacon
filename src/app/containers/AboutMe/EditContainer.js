import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react/native'
// views
import EditView from "../../views/AboutMe/EditView"

@inject("SubjectStore")
export default class EditContainer extends Component {

  componentWillMount() {
    //Actions.refresh({ key: 'drawer', open: false, title: "暱稱生日", rightTitle: "完成" })
    Actions.refresh({ title: this.props.title, rightTitle: "完成", onRight: this.props.onRight.bind(this.props.SubjectStore) })
  }

  render() {
    return(
      <EditView content = {this.props.content} />
    )
  }
}
