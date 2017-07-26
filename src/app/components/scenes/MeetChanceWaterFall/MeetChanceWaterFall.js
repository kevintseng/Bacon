import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'

import Wave from '../../common/layout/Wave/Wave'
import Cookie from '../../common/Cookie/Cookie'

const styles = {
  self: {
    alignSelf:'center'  
  }
}

const MeetChanceWaterFall = ({ flatListData }) => {

  return(
    <Wave>

      <ScrollView>

        <View>

          <View style={ styles.self }>
            <Cookie name={'自己的名字'}/>
          </View>

          <View>
            <FlatList
              data={ flatListData } 
              numColumns={3}
              renderItem={({item}) => <Cookie name={item.displayName} photoURL={ item.photoURL } onPressButton={ item.onPressButton } /> } 
            />
          </View>

        </View>

      </ScrollView>

    </Wave>
  )
}

export default MeetChanceWaterFall