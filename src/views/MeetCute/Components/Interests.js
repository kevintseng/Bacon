import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"

const Interests = inject("store")(observer(({ store }) => {
  return(
    <View>
      <Text>
        {store.user.hobby}
      </Text>
    </View>
  )
}))

export { Interests }