import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import Preview from '../../components/common/aboutme/Preview/Preview'

@inject("firebase","SubjectStore") @observer
export default class PreviewContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }


  render() {
    return(
      <Preview/>
    )
  }
}

