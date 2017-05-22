import React from 'react';
import { Scene, Actions } from 'react-native-router-flux';
import { Icon } from "react-native-elements";
import { Index } from './Scene/Index';
import { Edit } from './Scene/Edit';


const menuButton = () => (
  <Icon name = "menu" color = "#000" onPress = { () => Actions.refresh({ key: "drawer", open: value => !value }) } />
)

const handleOnRight = () => {
  Actions.aboutMeIndex()
}

const rightTitle = () => {
  return '完成'
}

module.exports =
<Scene key = "aboutMeRoutes">
  <Scene key = "aboutMeIndex" component = { Index } title = "關於我" renderLeftButton = { menuButton } />
  <Scene key = "aboutMeEdit" component = { Edit } title = "編輯" renderLeftButton = { menuButton } rightTitle = { rightTitle() } onRight = { handleOnRight } />
</Scene>