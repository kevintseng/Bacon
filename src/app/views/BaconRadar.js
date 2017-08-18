import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Radar } from 'react-native-pathjs-charts'

const { width, height } = Dimensions.get('window')

    const defaultData = [{
      "魅力值": 30,
      "熱門度": 77,
      "好感度": 20,
      "友好度": 99,
      "活耀度": 18,
    }]

    const options = {
      width,
      height: 300,
      r: 150,
      max: 150,
      fill: "#D63768",
      stroke: "#D63768",
      animate: {
        type: 'oneByOne',
        duration: 10
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    }

const BaconRadar = ({data}) => {

  return(
    <View>
      <Radar data={data || defaultData } options={options}/>
    </View>
  )
}

export default BaconRadar