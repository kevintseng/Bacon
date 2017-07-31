import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import Profile from '../../views/Profile'

@inject("firebase","SubjectStore") @observer
export default class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  verityEmail = () => (
    this.firebase.auth().currentUser.emailVerified
  )

  render() {
    return(
      <Profile
        source={ this.SubjectStore.photoURL }
        verityEmail={ this.verityEmail }
        verityPhoto={ this.SubjectStore.verityPhoto }
        displayName={ this.SubjectStore.displayName }
        age={ this.SubjectStore.age }
        city={ this.SubjectStore.city }
        bio={ this.SubjectStore.bio }
        //lang='語言能力'
        />
    )
  }
}

