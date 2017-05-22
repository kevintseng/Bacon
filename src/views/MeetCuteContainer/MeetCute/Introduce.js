import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const Introduce = inject("prey")(observer(({ prey }) => {
  return(
    <View style = {{margin: 10}} >
      <Text>
        {prey.introduce}
      </Text>
    </View>
  )
}))

export { Introduce }