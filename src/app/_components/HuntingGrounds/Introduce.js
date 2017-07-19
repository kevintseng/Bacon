import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const Introduce = inject("ObjectStore")(observer(({ ObjectStore }) => {
  return(
    <View style = {{margin: 10}} >
      <Text numberOfLines={1}>
        {ObjectStore.introduce}
      </Text>
    </View>
  )
}))

export { Introduce }