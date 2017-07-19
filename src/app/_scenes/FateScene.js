import React from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import { Icon } from "react-native-elements"
// providers
import { FateAllProvider, FateSingleProvider } from '../providers/Provider'

const menuButton = () => (
  <Icon name = "menu" color = "#000" onPress = { () => Actions.refresh({ key: "drawer", open: value => !value }) } />
)

const FateScene = (
<Scene key = "fate">
  <Scene key = "fateAll" hideTabBar component = { FateAllProvider } title = "緣分" renderLeftButton = { menuButton } />
  <Scene key = "fateSingle" hideTabBar component = { FateSingleProvider } title = "好感" renderLeftButton = { menuButton } />
</Scene>
)

export default FateScene