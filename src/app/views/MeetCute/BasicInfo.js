import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const BasicInfo = inject("ObjectStore")(observer(({ ObjectStore }) => {
  return(
    <View style = {{margin: 10}}>
      <Text style = {{fontSize: 24, color: "#000000"}}>
        {ObjectStore.displayName}, {ObjectStore.age}
      </Text>
    </View>
  )
}))

export { BasicInfo }