import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'


const styles = {
  task: {
    padding: 10
  },
  date: {
    color: '#d63768',
    textAlign: 'right'
  }
}

const TaskList = ({task,date}) => {

  return(
    <View style={styles.task}>
      <Text>{task}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default TaskList