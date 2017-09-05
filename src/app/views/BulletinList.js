import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'


const styles = {
  title: {
    padding: 10
  },
  date: {
    color: '#d63768',
    textAlign: 'right'
  }
}

const BulletinList = ({title,date}) => {

  return(
    <View style={styles.title}>
      <Text>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default BulletinList