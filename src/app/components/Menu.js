import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.refresh({ key: "Drawer", open: value => !value })

const styles = {
  menu: {
    marginTop: 3,
    marginLeft: 5
  }
}

const Menu = () => {
  return(
    <TouchableOpacity style={ styles.menu } onPress={ menuOnPress } >
      <Image source={require('../../images/btn_menu.png')} />
    </TouchableOpacity>
  )
}

export default Menu