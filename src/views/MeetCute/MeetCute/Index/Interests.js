import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Badge } from 'react-native-elements'

const Interests = inject("store")(observer(({ store }) => {
  return(
    <View style={{flexDirection: 'row', margin: 10}}>
      <Badge value={"電影"} textStyle={{fontSize: 10, color: "#000000"}} containerStyle={{ borderWidth: 0.5, borderColor: '#000000', backgroundColor: '#ffffff', width: 50}} />
    </View>
  )
}))

export { Interests }