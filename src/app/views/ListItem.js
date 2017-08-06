import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Badge } from 'react-native-elements'

const ListItem = ({listPicSource, listTitle, showBadge, badgeCount, listOnPress}) => {

  const _badgeCount = badgeCount > 99 ? 99 : badgeCount

  return(
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{width: 40,opacity: 0, justifyContent: 'center'}} >
        <Badge value={0} containerStyle={{ backgroundColor: 'red'}}/>
      </View>   
      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 35, paddingRight: 35}} onPress={ listOnPress }>      
        <View style={{flexDirection: 'row'}}>
          <View style={{alignSelf: 'center', marginRight: 5}}>
            <Image source={ listPicSource } />
          </View>
          <View style={{alignSelf: 'center', marginLeft: 5}}>
            <Text style={{textAlign: 'center',color: '#606060',fontWeight: 'normal'}}>{ listTitle }</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={ showBadge ? { width: 40,justifyContent: 'center' } : { width: 40, opacity: 0,justifyContent: 'center'} } >
        <Badge value={ _badgeCount } containerStyle={{ backgroundColor: 'red'}}/>
      </View>
    </View>
  )
}

export default ListItem