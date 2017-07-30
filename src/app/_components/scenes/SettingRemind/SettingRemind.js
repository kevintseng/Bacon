import React from 'react'
import { View, Text, FlatList } from 'react-native'

import Knife from '../../common/layout/Knife/Knife'
import BaconSwitch from '../../common/BaconSwitch/BaconSwitch'

const styles = {
  title : {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060'
  }
}

const SettingRemind = ({ topFlatListData, bottomFlatListData }) => {
  return(
    <Knife>

      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={ styles.title }>提示</Text>
        </View>

        <View>
          <FlatList
            data={ topFlatListData } // [ {switchText:'在邂逅中看不到我', switchValue: true, switchonValueChange: fnc }, ... ]
            renderItem={({item}) => <BaconSwitch switchText={ item.switchText } switchValue={ item.switchValue } switchonValueChange={ item.switchonValueChange }/>
          } 
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text style={ styles.title }>震動</Text>
        </View>

        <View>
          <FlatList
            data={ bottomFlatListData } // [ {switchText:'在邂逅中看不到我', switchValue: true, switchonValueChange: fnc }, ... ]
            renderItem={({item}) => <BaconSwitch switchText={ item.switchText } switchValue={ item.switchValue } switchonValueChange={ item.switchonValueChange }/>
          } 
          />
        </View>
      </View>

    </Knife>
  )
}

export default SettingRemind