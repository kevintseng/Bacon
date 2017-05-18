import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Icon } from 'react-native-elements'
import geolib from 'geolib'

const Distance = inject("prey","store")(observer(({ prey, store }) => {

  const distance = geolib.getDistance(
      {latitude: store.user.geocode.lat, longitude: store.user.geocode.lng},
      {latitude: prey.user.geocode.lat, longitude: prey.user.geocode.lng}
  )

  return(
    <View style={{flexDirection: 'row', margin: 10}}>
     <Icon name='person-pin-circle'></Icon>
      <Text>
        你們距離大約 {distance/1000} 公里
      </Text>
    </View>
  )
}))

export { Distance }