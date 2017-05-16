import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Icon } from 'react-native-elements'


const Distance = inject("store")(observer(({ store }) => {
  return(
    <View style={{flexDirection: 'row'}}>
     <Icon name='person-pin-circle'></Icon>
      <Text>
        你們距離大約 7.9 公里
      </Text>
    </View>
  )
}))

export { Distance }