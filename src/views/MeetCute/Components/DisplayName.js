import React from "react"
import { View, Text } from "react-native"
//import { observer, inject } from "mobx-react/native"

const DisplayName = ({ data }) => {
  return(
    <View>
      <Text>
        {data.displayName}
      </Text>
    </View>
  )
}

export { DisplayName }