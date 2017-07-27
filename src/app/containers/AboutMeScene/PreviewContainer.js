import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import Court from '../../components/common/Court/Court'

@inject("firebase","SubjectStore") @observer
export default class PreviewContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      visible: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }


  changeVisible = () => {
    //alert('sxsaxax')
    this.setState({
      visible: !this.state.visible
    })
  }


  render() {
    return(
      <Court 
        visible={this.state.visible}
        open={this.changeVisible}
        close={this.changeVisible}
      />
    )
  }
}

