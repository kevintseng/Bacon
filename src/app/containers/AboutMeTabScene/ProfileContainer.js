import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import Profile from '../../views/Profile'

import ProfileBadgeWallContainer from './ProfileBadgeWallContainer'

import DisplayNameAgeContainer from '../../containers/AboutMeEditScene/DisplayNameAge/DisplayNameAgeContainer'
import CityContainer from '../../containers/AboutMeEditScene/City/CityContainer'
import BioContainer from '../../containers/AboutMeEditScene/Bio/BioContainer'
import LangsContainer from '../../containers/AboutMeEditScene/Langs/LangsContainer'
import InterestsContainer from '../../containers/AboutMeEditScene/Interests/InterestsContainer'


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
    Actions.Upgrade()
  }

  goToQUpgrade = () => {
    Actions.Bonus()
  }

  verificationEmail = () => {
    if (this.SubjectStore.emailVerified) {
      alert('您的信件地址已認證')
    } else {
      this.firebase.auth().currentUser.sendEmailVerification().then(() => {
        alert('認證信已寄出')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Profile
          source={ this.SubjectStore.avatar }
          vip={ this.SubjectStore.vip }
          verityEmail={ this.SubjectStore.emailVerified }
          //verityPhoto={ this.SubjectStore.photoVerified }
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
          onPressQUpgrade={ this.goToQUpgrade }
          onPressEmail={ this.verificationEmail }
          />
        <ProfileBadgeWallContainer
          onPressInterests={ this.goToEditInterests }
        />
      </View>
    )
  }
}

