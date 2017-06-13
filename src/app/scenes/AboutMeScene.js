import React from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import { Icon } from "react-native-elements"
// providers
import { ShowProvider, EditProvider } from '../providers/Provider'

const menuButton = () => (
  <Icon name = "menu" color = "#000" onPress = { () => Actions.refresh({ key: "drawer", open: value => !value }) } />
)

const handleOnRight = () => {
  Actions.AboutMeShow()
}

const rightTitle = () => ('完成')

const AboutMeScene = (
<Scene key = "aboutme">
  <Scene key = "AboutMeShow" hideTabBar component = { ShowProvider } title = "關於我" renderLeftButton = { menuButton } />
  <Scene key = "AboutMeEdit" hideTabBar component = { EditProvider } title = "編輯" renderLeftButton = { menuButton } rightTitle = { rightTitle() } onRight = { handleOnRight } />
</Scene>
)

export default AboutMeScene