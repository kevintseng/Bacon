'use strict'
import React from 'react';
import { View, Text } from 'react-native'
import { Item } from './Components/Item'

const AdvancedInfo = (props) => {

  const { onpressIntroduce, onpressLanguage, onpressInterests } = props

  return(
    <View>
      <Item 
        title = "自我介紹" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { onpressIntroduce } >
        <Text>我叫小曹</Text>
      </Item>
      <Item 
        title = "語言能力" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { onpressLanguage } >
        <Text>中文 英文</Text>
      </Item>
      <Item 
        title = "興趣愛好" 
        displayTitle styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { onpressInterests } >
        <Text>運動 看妹</Text>
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