import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import Profile from '../../views/Profile'

import BadgeWallContainer from './BadgeWallContainer'

import DisplayNameAgeContainer from '../../containers/AboutMeEdit/DisplayNameAge/DisplayNameAgeContainer'
import CityContainer from '../../containers/AboutMeEdit/City/CityContainer'
import BioContainer from '../../containers/AboutMeEdit/Bio/BioContainer'
import LangsContainer from '../../containers/AboutMeEdit/Langs/LangsContainer'
import InterestsContainer from '../../containers/AboutMeEdit/Interests/InterestsContainer'


@inject('SubjectStore','firebase') @observer
export default class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    console.log(this.SubjectStore.hobbiesToFlatList)
    Actions.refresh({ key: 'Drawer', open: false })
  }

  verityEmail = () => (
    this.firebase.auth().currentUser.emailVerified
  )

  goToEditDisplayName = () => {
    Actions.AboutMeEdit({title: '暱稱年齡',content: <DisplayNameAgeContainer/>})
  }

  goToEditCity = () => {
    Actions.AboutMeEdit({title: '常在城市',content: <CityContainer/>})
  }

  goToEditBio = () => {
    Actions.AboutMeEdit({title: '自我介紹',content: <BioContainer/>})
  }

  goToEditLangs = () => {
    Actions.AboutMeEdit({title: '語言能力',content: <LangsContainer/>})
  }

  goToEditInterests = () => {
    Actions.AboutMeEdit({title: '興趣愛好', content: <InterestsContainer/>})
  }

  goToMemberUpgrade = () => {
    Actions.upgrade()
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Profile
          source={ this.SubjectStore.avatar }
          verityEmail={ this.verityEmail }
          verityPhoto={ this.SubjectStore.photoVerified }
          displayName={ this.SubjectStore.nickname }
          age={ this.SubjectStore.age }
          city={ this.SubjectStore.address }
          bio={ this.SubjectStore.bio }
          langs={ this.SubjectStore.languagesToString }
          //interests={ this.SubjectStore.hobbies }

          onPressDisplayName={ this.goToEditDisplayName } 
          onPressCity={ this.goToEditCity }
          onPressBio={ this.goToEditBio }
          onPressLangs={ this.goToEditLangs }
          onPressMemberUpgrade={ this.goToMemberUpgrade }
          />
        <BadgeWallContainer
          onPressInterests={ this.goToEditInterests }
        />
      </View>
    )
  }
}

