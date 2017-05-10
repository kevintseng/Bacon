import React from 'react'
import { View } from 'react-native'

const styles = {
  Edit: {
    flex: 1,
    padding: 10
  }
}


const Edit = ({ content }) => {

  return (
    <View style = {styles.Edit }>
      { content }
    </View>
  )
}

export { Edit }