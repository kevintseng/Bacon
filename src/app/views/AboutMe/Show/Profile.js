'use strict'
import React from 'react'
import { ScrollView } from 'react-native'
// Profile Layouts
import BasicInfo from './Profile/BasicInfo'
import AccountStatus from './Profile/AccountStatus'
import Verification from './Profile/Verification'
import AdvancedInfo from './Profile/AdvancedInfo'

const Profile = () => {
  return(
    <ScrollView style={{flex: 1}}>
      <BasicInfo/>
      <AccountStatus/>
      <Verification/>
      <AdvancedInfo/>
    </ScrollView>
  )
}

export default Profile