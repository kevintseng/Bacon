//'use strict'
import React from 'react'
import { View, Text } from 'react-native'
import { Item } from './Components/Item'
import { observer, inject } from 'mobx-react/native'

const AdvancedInfo = inject("SubjectStore")(observer(({ SubjectStore }) => {
  return(
    <View>
      <Item 
        title = "自我介紹" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { SubjectStore.onpressIntroduce.bind(SubjectStore) } >
        <Text>{ SubjectStore.bio }</Text>
      </Item>
      <Item 
        title = "語言能力" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { SubjectStore.onpressLanguage.bind(SubjectStore) } >
        <Text>{ SubjectStore.lang }</Text>
      </Item>
    </View>                           
  )
}))

export default AdvancedInfo

/*
      <Item 
        title = "興趣愛好" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { SubjectStore.onpressInterests.bind(SubjectStore) } >
        <Text>{ SubjectStore.interests }</Text>
      </Item>
*/