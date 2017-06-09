import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react/native'

const styles = {
  Edit: {
    flex: 1,
    padding: 10
  }
}

const EditView = observer(({ content }) => {

  return (
    <View style = {styles.Edit}>
      { content }
    </View>
  )
})

export default EditView