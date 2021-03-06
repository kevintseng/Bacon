import React, { Component } from 'react'
import { ScrollView, Text, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import Profile from '../../../../../../views/Profile'

import ProfileBadgeWallContainer from './containers/ProfileBadgeWallContainer'

import IntroInjection from '../../../AboutMeEdit/injections/IntroInjection/IntroInjection'
import CityInjection from '../../../AboutMeEdit/injections/CityInjection/CityInjection'
import BioInjection from '../../../AboutMeEdit/injections/BioInjection/BioInjection'
import LangsInjection from '../../../AboutMeEdit/injections/LangInjection/LangInjection'
import HobbyInjection from '../../../AboutMeEdit/injections/HobbyInjection/HobbyInjection'

const styles = {
  view: {
    flex: 1
  }
}

@inject('SubjectStore','firebase') @observer
export default class ProfileTab extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  goToEditDisplayName = () => {
    Actions.AboutMeEdit({title: '暱稱年齡',content: <IntroInjection/>})
  }

  goToEditCity = () => {
    Actions.AboutMeEdit({title: '常在城市',content: <CityInjection/>})
  }

  goToEditBio = () => {
    Actions.AboutMeEdit({title: '自我介紹',content: <BioInjection/>})
  }

  goToEditLangs = () => {
    Actions.AboutMeEdit({title: '語言能力',content: <LangsInjection/>})
  }

  goToEditInterests = () => {
    Actions.AboutMeEdit({title: '興趣愛好', content: <HobbyInjection/>})
  }

  goToMemberUpgrade = () => {
    if (this.SubjectStore.vip) {
      Alert.alert(
        '管理員提示', '您已是高級會員', [
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false }
      )
    } else {
      Actions.Upgrade()
      //alert('轉到升級頁')
    }
  }

  goToQUpgrade = () => {
    Actions.BuyBonus()
    //alert('轉到Ｑ點儲值頁')
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
      <ScrollView style={styles.view}>
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
          bonus={ this.SubjectStore.bonus }
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
      </ScrollView>
    )
  }
}
