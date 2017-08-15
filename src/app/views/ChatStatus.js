import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const styles = {
  notice: {
    padding: 10, // 加大點擊範圍
  },
}

const getChatStatus = statusCode => {
  switch (statusCode) {
    case 0:
      return "我的狀態"
    case 1:
      return "放空中"
    case 2:
      return "忙碌中"
    case 3:
      return "低潮中"
    default:
      return statusCode
  }
}

const ChatStatus = ({onPress, code}) => {
  // console.log("code: ", code)
  const label = getChatStatus(code)
  return (
    <TouchableOpacity style={styles.notice} onPress={onPress} >
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default ChatStatus
