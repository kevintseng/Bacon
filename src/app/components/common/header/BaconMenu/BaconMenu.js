import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.refresh({ key: "Drawer", open: value => !value })

const styles = {
  menu: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 3
  }
}

const BaconMenu = () => {
  return(
    <TouchableOpacity style={ styles.menu } onPress={ menuOnPress } >
      <Image source={require('./img/btn_menu.png')} />
    </TouchableOpacity>
  )
}

export default BaconMenu