//export * from './Profile';
import React from 'react';
import { Scene, Actions } from 'react-native-router-flux';
import { Icon } from "react-native-elements";
import { Profile } from './Profile';
import Edit from './Edit';


const menuButton = () => (
  <Icon
    name="menu"
    color="#000"
    onPress={() => Actions.refresh({ key: "drawer", open: value => !value })}
  />
)

const handleOnRight = () => {
  Actions.profile()
}

const rightTitle = () => {
  return '完成'
}

module.exports =
<Scene key="profilerouter">
  <Scene key="profile" component={Profile} title="關於我" renderLeftButton={menuButton} />
  <Scene key="edit" component={Edit} title="編輯" renderLeftButton={menuButton} rightTitle={rightTitle()} onRight={handleOnRight}/>
</Scene> 
