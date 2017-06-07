'use strict'
import React from 'react'
import { ScrollView, Dimensions } from 'react-native'
// Profile Layouts
import BasicInfo from './Profile/BasicInfo'
import AccountStatus from './Profile/AccountStatus'
import Verification from './Profile/Verification'
import AdvancedInfo from './Profile/AdvancedInfo'

const { width, height } = Dimensions.get('window');

const Profile = () => {
  return(
    <ScrollView style={{backgroundColor: "#f0f0f0", width, height: 100}}>
      <BasicInfo/>
      <AccountStatus/>
      <Verification/>
      <AdvancedInfo/>
    </ScrollView>
  )
}

export default Profile