import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { BaconBadgeYes, BaconBadgeNo } from './BaconBadge/BaconBadge'


const styles = {
  task: {
    padding: 10,
    borderBottomWidth: 0.2,
    borderColor: '#b3b3b3'
  },
  bonus: {
    color: '#d63768',
    textAlign: 'left',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent'
  },
  taskText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent',
    fontWeight: '400'    
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}

const TaskList = ({taken,task,bonus,onPress}) => {

  return(
    <TouchableOpacity style={styles.task} onPress={onPress}>
      <Text style={styles.taskText}>{task}</Text>
      <View style={styles.bottom}>
        <Text style={styles.bonus}>{bonus}</Text>
        <BaconBadgeYes text={taken ? '已領取' : '未領取'}/>
      </View>
    </TouchableOpacity>
  )
}

export default TaskList