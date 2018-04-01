import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"
import { observer, inject } from 'mobx-react'

//const menuOnPress = () => Actions.refresh({ key: "Drawer", open: value => !value })

const styles = {
  menu: {
    padding : 10, // 加大點擊範圍
  }
}

const BaconMenu = inject('SubjectStore','ControlStore')(observer(() => {

  menuOnPress = () => {
    if (this.ControlStore.drawer._open) {
      this.ControlStore.drawer.close()
    } else {
      this.ControlStore.drawer.open()
    }
  }

  return(
    <TouchableOpacity style={ styles.menu } onPress={ menuOnPress } >
      <Image source={this.SubjectStore.showFateBadge ? require('./img/btn_menu_noti.png') : require('./img/btn_menu.png')} />
    </TouchableOpacity>
  )
}))

export default BaconMenu