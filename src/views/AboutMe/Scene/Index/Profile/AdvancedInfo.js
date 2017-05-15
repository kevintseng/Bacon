'use strict'
import React from 'react';
import { View, Text } from 'react-native'
import { Item } from './Components/Item'

const AdvancedInfo = ({ introduce, language, interests, onpressIntroduce, onpressLanguage, onpressInterests }) => {

  return(
    <View>
      <Item 
        title = "自我介紹" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { onpressIntroduce } >
        <Text>{ introduce }</Text>
      </Item>
      <Item 
        title = "語言能力" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { onpressLanguage } >
        <Text>{ language }</Text>
      </Item>
      <Item 
        title = "興趣愛好" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { onpressInterests } >
        <Text>{ interests }</Text>
      </Item>
    </View>                           
    )
}

export { AdvancedInfo }

/*
        <Field label = { 'introduce' } title = { '自我介紹' } content = { props.introduce } />
        <Field label = { 'langauge' } title = { '語言能力' } content = { props.langauge } />  
        <Field label = { 'interests' } title = { '興趣愛好' } content = { props.interests } /> 
*/