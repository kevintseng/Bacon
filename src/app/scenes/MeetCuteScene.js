import React from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import { Icon } from "react-native-elements"
// providers
import { MeetCuteShowProvider, MeetCuteEditProvider } from '../providers/Provider'

const menuButton = () => (
  <Icon name = "menu" color = "#000" onPress = { () => Actions.refresh({ key: "drawer", open: value => !value }) } />
)

const handleOnRight = () => {
  Actions.MeetCuteShow({type: 'reset'})  
}

const rightTitle = () => ('完成')

const SettingButton = () => (
  <Icon
    name="settings"
    color="#000"
    onPress={() => Actions.MeetCuteEdit()}
  />
)

const MeetCuteScene = (
<Scene key = "meetcute">
  <Scene key = "MeetCuteShow" hideTabBar component = { MeetCuteShowProvider } title = "邂逅" renderLeftButton = { menuButton } renderRightButton = {SettingButton} />
  <Scene key = "MeetCuteEdit" hideTabBar component = { MeetCuteEditProvider } title = "邂逅設定" renderLeftButton = { menuButton } rightTitle = { rightTitle() } onRight = { handleOnRight }/>
</Scene>
)

export default MeetCuteScene