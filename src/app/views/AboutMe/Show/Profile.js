'use strict'
import React from 'react'
import { ScrollView, View } from 'react-native'
// Profile Layouts
import BasicInfo from './Profile/BasicInfo'
import AccountStatus from './Profile/AccountStatus'
import Verification from './Profile/Verification'
import AdvancedInfo from './Profile/AdvancedInfo'

const Profile = () => {
  return(
    <ScrollView>
      <BasicInfo/>
      <AccountStatus/>
      <Verification/>
      <AdvancedInfo/>
      <View style={{ height: 20 }} />
    </ScrollView>
  )
}

export default Profile