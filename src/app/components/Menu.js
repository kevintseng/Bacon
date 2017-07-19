import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Actions } from "react-native-router-flux"

const menuOnPress = () => Actions.refresh({ key: "Drawer", open: value => !value })

const Menu = () => {
  return(
    <View>
      <TouchableOpacity onPress={ menuOnPress } >
        <Image source={require('../../images/btn_menu.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default Menu