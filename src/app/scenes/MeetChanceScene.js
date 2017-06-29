import React from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import { Icon } from "react-native-elements"
// providers
import { MeetChanceAllProvider, MeetChanceSingleProvider, MeetChanceEditProvider } from '../providers/Provider'

const menuButton = () => (
  <Icon name = "menu" color = "#000" onPress = { () => Actions.refresh({ key: "drawer", open: value => !value }) } />
)

const handleOnRight = () => {
  Actions.meetChanceAll(({type: 'reset'})  )
}

const rightTitle = () => ('完成')

const SettingButton = () => (
  <Icon
    name="settings"
    color="#000"
    onPress={() => Actions.meetChanceEdit()}
  />  
)
/*
const MeetChanceScene = (
  <Scene key = "meetchance">
    <Scene key = "meetChanceAll" hideTabBar component = { MeetChanceAllProvider } title = "巧遇" renderLeftButton = { menuButton } renderRightButton={ SettingButton }/>
    <Scene key = "meetChanceSingle" hideTabBar component = { MeetChanceSingleProvider } title = "巧遇" renderLeftButton = { menuButton } renderRightButton={ SettingButton }/>
    <Scene key = "meetChanceEdit" hideTabBar component = { MeetChanceEditProvider } title = "巧遇設定" renderLeftButton = { menuButton } rightTitle = { rightTitle() } onRight = { handleOnRight }/>
  </Scene>
)
*/
const MeetChanceAllScene = (
    <Scene key = "meetChanceAll" hideTabBar component = { MeetChanceAllProvider } title = "巧遇" renderLeftButton = { menuButton } renderRightButton={ SettingButton }/>
)

const MeetChanceSingleScene = (
    <Scene key = "meetChanceSingle" hideTabBar component = { MeetChanceSingleProvider } title = "巧遇" renderLeftButton = { menuButton } renderRightButton={ SettingButton }/>
)

const MeetChanceEdit = (
  <Scene key = "meetChanceEdit" hideTabBar component = { MeetChanceEditProvider } title = "巧遇設定" renderLeftButton = { menuButton } rightTitle = { rightTitle() } onRight = { handleOnRight }/>
)

export { MeetChanceAllScene, MeetChanceSingleScene, MeetChanceEdit }