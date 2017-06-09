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
      <MultiSlider values={[3,7]} sliderLength={280} onValuesChange={sliderOneValuesChange}/>
      <Text>進階篩選，只限高級會員</Text>
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

  )
}

export default MeetCuteEdit