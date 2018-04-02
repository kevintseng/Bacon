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

const showConform = (conform) => {
  if (conform === 0) {
    return '待領取'
  } else if (conform === 1) {
    return '未完成'
  } else if (conform === 2) {
    return '未達成'
  } else {
    return '錯誤'
  }
}

const TaskList = ({taken,task,bonus,onPress,conform}) => {

  return(
    <TouchableOpacity style={styles.task} onPress={onPress}>
      <View style={styles.bottom}>
        <Text style={styles.taskText}>{task}</Text>
        <Text style={styles.bonus}>{bonus}點</Text>
        <BaconBadgeYes 
          activeOpacity={1}
          text={
            showConform(conform)
          }
        />
      </View>
    </TouchableOpacity>
  )
}

export default TaskList