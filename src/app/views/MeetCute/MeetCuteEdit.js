import React from "react"
//import HuntingGrounds from "../../components/HuntingGrounds"
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { CheckBox } from 'react-native-elements'
//import Carousel from "react-native-looped-carousel"

//const { width, height } = Dimensions.get('window')

const sliderOneValuesChange = (values) => {
  console.warn(values[0])
  console.warn(values[1])
}

const MeetCuteEdit = () => {
  return(
    <View style={{flex: 1, marginTop: 54, alignItems: "center"}}>
      <View style={{width: 280, flexDirection: 'row', marginBottom: 20}}>
        <View style={{flex: 1, justifyContent: "flex-start"}}>
          <Text>年齡篩選</Text> 
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: "flex-end"}}>
          <Text style={{color: 'blue'}}>25</Text>
          <Text> - </Text>
          <Text style={{color: 'blue'}}>37</Text>
        </View>
      </View>
      <MultiSlider values={[3,7]} sliderLength={280} onValuesChange={sliderOneValuesChange}/>
      <View>
        <Text>進階篩選，只限高級會員</Text>
      </View>
      <View style={{alignItems: "flex-start"}}>
        <CheckBox
          center
          title='只顯示三張照片以上的會員'
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
}

export default MeetCuteEdit