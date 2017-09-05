import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'


const styles = {
  title: {
    padding: 10
  },
  date: {
    color: '#d63768',
    textAlign: 'right',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent'
  },
  titleText: {
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    backgroundColor: 'transparent'
  }
}

const BulletinList = ({title,date}) => {

  return(
    <View style={styles.title}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default BulletinList