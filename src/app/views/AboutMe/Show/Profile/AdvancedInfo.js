//'use strict'
import React from 'react'
import { View, Text } from 'react-native'
import { Item } from './Components/Item'
import { observer, inject } from 'mobx-react/native'
import { Badge } from 'react-native-elements'

const AdvancedInfo = inject("SubjectStore")(observer(({ SubjectStore }) => {

  const renderhobby = SubjectStore.hobby.map(
    (hobby) => (<Badge key={hobby} containerStyle={{ backgroundColor: '#ffffff', borderWidth: 1, marginTop: 10, marginRight: 10}} textStyle={{ color: '#000000' }} value={hobby}/>)
    )

  return(
    <View>
      <Item 
        title = "自我介紹" 
        displayTitle 
        styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { SubjectStore.onpressIntroduce.bind(SubjectStore) } >
        <Text numberOfLines={1}>{ SubjectStore.bio }</Text>
      </Item>
      <Item 
        title = "語言能力" 
        displayTitle 
        styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { SubjectStore.onpressLanguage.bind(SubjectStore) } >
        <Text numberOfLines={1}>{ SubjectStore.lang }</Text>
      </Item>
      <Item 
        title = "興趣愛好" 
        displayTitle 
        styleTitle = { { color: "#000000" } } 
        tag = "編輯" 
        onpress = { SubjectStore.onpressInterests.bind(SubjectStore) } >
          <View style={{alignItems: 'flex-start',flexDirection: 'row', marginTop: 5, flexWrap: 'wrap'}}>
            {renderhobby}
          </View>
      </Item>
    </View>                           
  )
}))

export default AdvancedInfo