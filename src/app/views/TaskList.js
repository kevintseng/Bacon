import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'


const styles = {
  task: {
    padding: 10,
    borderBottomWidth: 0.5
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
    fontWeight: '500'    
  }
}

const TaskList = ({task,bonus,onPress}) => {

  return(
    <TouchableOpacity style={styles.task} onPress={onPress}>
      <Text style={styles.taskText}>{task}</Text>
      <Text style={styles.bonus}>{bonus}</Text>
    </TouchableOpacity>
  )
}

export default TaskList