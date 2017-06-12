import React from 'react'
import { View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { CheckBox } from 'react-native-elements'

const Vip = inject("SubjectStore")(observer(({ SubjectStore }) => {
  
  return(
    <View>
      <CheckBox
        title='是否升級為高級會員'
        checked={SubjectStore.vip}
        onPress={SubjectStore.setVip.bind(SubjectStore)}
      />
    </View>
  )
}))

export default Vip