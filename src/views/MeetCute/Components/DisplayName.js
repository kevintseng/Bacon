import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const DisplayName = inject("store")(observer(({ store }) => {
  return(
    <View>
      <Text>
        {store.user.displayName}
      </Text>
    </View>
  )
}))

export { DisplayName }