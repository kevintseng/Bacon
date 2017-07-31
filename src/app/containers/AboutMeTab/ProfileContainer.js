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

  goToEditDisplayName = () => {
    Actions.AboutMeEdit({title: '暱稱年齡'})
  }

  goToEditCity = () => {
    Actions.AboutMeEdit({title: '常在城市'})
  }

  goToEditBio = () => {
    Actions.AboutMeEdit({title: '自我介紹'})
  }

  goToEditLangs = () => {
    Actions.AboutMeEdit({title: '語言能力'})
  }

  goToEditInterests = () => {
    Actions.AboutMeEdit({title: '興趣愛好'})
  }

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
        onPressDisplayName={ this.goToEditDisplayName } 
        onPressCity={ this.goToEditCity }
        onPressBio={ this.goToEditBio }
        onPressLangs={ this.goToEditLangs }
        onPressInterests={ this.goToEditInterests }
        />
    )
  }
}

