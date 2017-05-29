import React from "react"
import { View, Text } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Icon } from 'react-native-elements'


const renderLanguages = (langs) => {
    return Object.keys(langs).filter(k => langs[k]).join(',')
  }  

const Language = inject("PreyStore")(observer(({ PreyStore }) => {
  return(
    <View style={{flexDirection: 'row', margin: 10}}>
      <Icon name='language'></Icon>
      <Text>
        {renderLanguages(PreyStore.languages)}
      </Text>
    </View>
  )
}))

export { Language }