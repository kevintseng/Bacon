import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Icon } from 'react-native-elements'

const renderLanguages = (langs) => (Object.keys(langs).filter(k => langs[k]).join(','))

const Language = inject("ObjectStore")(observer(({ ObjectStore }) => {

  const langs = renderLanguages(ObjectStore.languages)

  return(
    <View style={{flexDirection: 'row', margin: 10}}>
      <Icon name='language'></Icon>
      <Text numberOfLines={1} style={{marginLeft: 2, marginTop: 2 }}>
        { langs || "MeetQ語" }
      </Text>
    </View>
  )
}))

export { Language }