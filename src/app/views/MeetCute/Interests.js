import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Badge } from 'react-native-elements'

const Interests = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const renderInterests = ObjectStore.interests.map((interest) => (<Badge key={interest} value={interest} textStyle={{fontSize: 10, color: "#000000"}} containerStyle={{ borderWidth: 0.5, borderColor: '#000000', backgroundColor: '#ffffff', marginRight: 10}}/>))

  return(
    <View style={{flexDirection: 'row', margin: 10}}>
      { renderInterests }
    </View>
  )
}))

export { Interests }