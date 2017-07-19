import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Badge } from 'react-native-elements'

const Interests = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const renderhobby = ObjectStore.interests.map((interest) => (<Badge key={interest} value={interest} textStyle={{fontSize: 10, color: "#000000"}} containerStyle={{ backgroundColor: '#ffffff', borderWidth: 1, marginTop: 10, marginRight: 10}}/>))

  return(
    <View style={{alignItems: 'flex-start',flexDirection: 'row', marginLeft: 7, marginTop: 5, flexWrap: 'wrap'}}>
      {renderhobby}
    </View>
  )
}))

export { Interests }