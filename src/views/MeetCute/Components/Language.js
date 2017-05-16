import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Icon } from 'react-native-elements'


const renderLanguages = (langs) => {
    return Object.keys(langs).filter(k => langs[k]).join(',')
  }  

const Language = inject("store")(observer(({ store }) => {
  return(
    <View style={{flexDirection: 'row'}}>
      <Icon name='language'></Icon>
      <Text>
        {renderLanguages(store.user.lang)}
      </Text>
    </View>
  )
}))

export { Language }