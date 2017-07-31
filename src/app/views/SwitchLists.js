import React from 'react'
import { FlatList } from 'react-native'

import BaconSwitch from './BaconSwitch/BaconSwitch'

const SwitchLists = ({ flatListData }) => {

  return(
    <FlatList
        data={ flatListData } // [ {switchText:'在邂逅中看不到我', switchValue: true, switchonValueChange: fnc }, ... ]
        renderItem={({item}) => <BaconSwitch switchText={ item.switchText } switchValue={ item.switchValue } switchonValueChange={ item.switchonValueChange }/>
      } 
    />
  )
}

export default SwitchLists