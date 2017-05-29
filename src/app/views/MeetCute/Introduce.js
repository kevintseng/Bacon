import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const Introduce = inject("PreyStore")(observer(({ PreyStore }) => {
  return(
    <View style = {{margin: 10}} >
      <Text>
        {PreyStore.introduce}
      </Text>
    </View>
  )
}))

export { Introduce }