import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const Introduce = inject("store")(observer(({ store }) => {
  return(
    <View style = {{margin: 10}} >
      <Text>
        {store.user.bio}
      </Text>
    </View>
  )
}))

export { Introduce }