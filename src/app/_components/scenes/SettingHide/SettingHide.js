import React from 'react'
import { View, FlatList } from 'react-native'

import Knife from '../../common/layout/Knife/Knife'
import BaconSwitch from '../../common/BaconSwitch/BaconSwitch'

const styles = {
  SettingHide : {
    marginTop: 50, 
    //borderTopWidth: 1, 
    //borderBottomWidth: 1, 
    //borderColor: '#606060'
  }
}

const SettingHide = ({ flatListData }) => {
  return(
    <Knife>
      <View style={ styles.SettingHide }>
        <FlatList
          data={ flatListData } // [ {switchText:'在邂逅中看不到我', switchValue: true, switchonValueChange: fnc }, ... ]
          renderItem={({item}) => <BaconSwitch switchText={ item.switchText } switchValue={ item.switchValue } switchonValueChange={ item.switchonValueChange }/>
        } 
        />
      </View>
    </Knife>
  )
}

export default SettingHide