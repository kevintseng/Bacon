import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Badge } from 'react-native-elements'

const Interests = inject("PreyStore")(observer(({ PreyStore }) => {

  const renderInterests = PreyStore.interests.map((interest) => (<Badge key={interest} value={interest} textStyle={{fontSize: 10, color: "#000000"}} containerStyle={{ borderWidth: 0.5, borderColor: '#000000', backgroundColor: '#ffffff', width: 50, marginRight: 10}}/>))

  return(
    <View style={{flexDirection: 'row', margin: 10}}>
      { renderInterests }
    </View>
  )
}))

export { Interests }