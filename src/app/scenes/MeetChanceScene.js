import React from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import { Icon } from "react-native-elements"
// providers
import { MeetChanceAllProvider, MeetChanceSingleProvider, MeetChanceEditProvider } from '../providers/Provider'

const menuButton = () => (
  <Icon name = "menu" color = "#000" onPress = { () => Actions.refresh({ key: "drawer", open: value => !value }) } />
)

//const handleOnRight = () => {
//  Actions.AboutMeShow()
//}

//const rightTitle = () => ('完成')

const SettingButton = () => (
  <Icon
    name="settings"
    color="#000"
    onPress={() => Actions.MeetChanceEdit()}
  />  
)

const MeetChanceAllScene = (
    <Scene key = "nearbyAll" hideTabBar component = { MeetChanceAllProvider } title = "巧遇" renderLeftButton = { menuButton } renderRightButton={ SettingButton }/>
)

const MeetChanceSingleScene = (
    <Scene key = "nearbySingle" hideTabBar component = { MeetChanceSingleProvider } title = "巧遇" renderLeftButton = { menuButton } renderRightButton={ SettingButton }/>
)

const MeetChanceEdit = (
  <Scene key = "MeetChanceEdit" hideTabBar component = { MeetChanceEditProvider } title = "巧遇設定" renderLeftButton = { menuButton } />
)

export { MeetChanceAllScene, MeetChanceSingleScene, MeetChanceEdit }