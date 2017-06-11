import React from 'react'
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { CheckBox } from 'react-native-elements'
import { observer, inject } from "mobx-react/native"

const MeetChanceEdit = inject("ObjectStore")(observer(({ObjectStore}) => {

  const sliderOneValuesChange = (values) => {
    ObjectStore.setAgeMin(values[0])
    ObjectStore.setAgeMax(values[1])
  }

  return(
    <View style={{flex: 1, marginTop: 54, alignItems: "center"}}>
      <View style={{width: 280, flexDirection: 'row', marginBottom: 20}}>
        <View style={{flex: 1, justifyContent: "flex-start"}}>
          <Text>年齡篩選</Text> 
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: "flex-end"}}>
          <Text style={{color: 'blue'}}>{ObjectStore.age_min}</Text>
          <Text> - </Text>
          <Text style={{color: 'blue'}}>{ObjectStore.age_max}</Text>
        </View>
      </View>
      <MultiSlider values={[ObjectStore.age_min,ObjectStore.age_max]} sliderLength={280} onValuesChange={sliderOneValuesChange}/>
      <View>
        <Text>進階篩選(只限高級會員)</Text>
      </View>
      <View style={{alignItems: "flex-start"}}>
        <CheckBox
          center
          title='不顯示離線的會員'
          checked
        />
        <CheckBox
          center
          title='對方互動狀態分析可見'
          checked
        />
      </View>
    </View>
  )
}))

export default MeetChanceEdit