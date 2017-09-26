import React from 'react'
import {  View, Text, ART, Dimensions } from 'react-native'

const { Surface, Shape, Path, Group } = ART

const { width, height } = Dimensions.get('window')

const radius = width/4

const radius_inner = width/8

const activityness = 0.53
const friendliness = 0.67
const favorability = 0.77
const popularity = 0.91
const attractive = 0.82

const linearGradient = new ART.LinearGradient({
  "0": "#f4a764",
  "1": "#d63768"
}, 0, 0, 100, 200)

const circle = ART.Path()
  .move(width/2, 10)
  .arc(0, radius * 2, radius)
  .arc(0, radius * -2, radius)

const circle_inner = ART.Path()
  .move(width/2, width/7)
  .arc(0, radius_inner * 2, radius_inner)
  .arc(0, radius_inner * -2, radius_inner)


const BaconRadar = ({ data }) => {

const star = new Path()
  .moveTo(width/2 - radius*activityness,width/3.8)
  .lineTo(width/2,width/3.8 + radius*friendliness)
  .lineTo(width/2 + radius*favorability,width/3.8)
  .lineTo(width/2 + radius*popularity*0.52532198881,width/3.8 - radius*popularity*0.85090352453)
  .lineTo(width/2 - radius*attractive*0.52532198881,width/3.8 - radius*attractive*0.85090352453)
  .close()

  return(
    <View>
      <Surface width={width} height={width}>
        <Group>
          <Shape d={star} stroke="#000000" fill={linearGradient} strokeWidth={0}/>
          <Shape d={circle} stroke="#606060" strokeWidth={0.5}/>
          <Shape d={circle_inner} stroke="#b3b3b3" strokeWidth={1} strokeDash={[10,5]}/>
        </Group>
      </Surface>
      <View style={{position: 'absolute',left: 85}}>
        <Text>魅力值</Text>
      </View>
      <View style={{position: 'absolute',right: 85}}>
        <Text>熱門度</Text>
      </View>
      <View style={{position: 'absolute',left: 40,top: 80}}>
        <Text>活躍度</Text>
      </View>
      <View style={{position: 'absolute',right: 40,top: 80}}>
        <Text>好感度</Text>
      </View>
      <View style={{alignSelf: 'center', paddingLeft: 0, position: 'absolute',top: width/2 + 15}}>
        <Text>友好度</Text>
      </View>
    </View> 
  )
}

export default BaconRadar

/*

  .moveTo(121,31)
  .lineTo(90,100)
  .lineTo(179,190)
  .lineTo(225,100)
  .lineTo(239,31)
*/