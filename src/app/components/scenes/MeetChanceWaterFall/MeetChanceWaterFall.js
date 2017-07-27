import React from 'react'
import { View, FlatList } from 'react-native'

import Wave from '../../common/layout/Wave/Wave'
import Cookie from '../../common/Cookie/Cookie'

const styles = {
  self: {
    alignSelf:'center'  
  }
}

const header = () => (
  <View style={ styles.self }>
    <Cookie size={150} name={'自己的名字'}/>
  </View>
)

const MeetChanceWaterFall = ({ flatListData }) => {

  return(
    <Wave>
      <FlatList
        data={ flatListData } 
        numColumns={3}
        renderItem={({item}) => <Cookie name={item.displayName} photoURL={ item.photoURL } onPressButton={ item.onPressButton } /> } 
        ListHeaderComponent={ header }
      />
    </Wave>
  )
}

export default MeetChanceWaterFall