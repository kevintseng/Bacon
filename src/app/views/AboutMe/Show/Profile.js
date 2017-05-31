'use strict'
import React from 'react'
import { ScrollView, View } from 'react-native'
//import { Actions } from 'react-native-router-flux';
//import { observer, inject } from 'mobx-react/native'
// Profile Layout
//import AccountStatus from './Profile/AccountStatus'
import BasicInfo from './Profile/BasicInfo'
//import { Verification } from './Profile/Verification'
//import { AdvancedInfo } from './Profile/AdvancedInfo'
// Profile correspond Edit Content
//import NickBirthday from '../Edit/NickBirthday'
//import Location from '../Edit/Location'
//import Introduce from '../Edit/Introduce'
//import Language from '../Edit/Language'
//import Interests from '../Edit/Interests'

//const ADD_IMAGE = require('hookup/src/images/addImage.png')
//const Language_Options = ["中文","英文","日文","韓文","菲律賓語","越南語"]

const Profile = () => {

  return(
    <ScrollView>
      <BasicInfo />
      <View style={{ height: 20 }} />
    </ScrollView>
  )
}

export default Profile