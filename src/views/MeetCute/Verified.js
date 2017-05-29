import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Badge } from 'react-native-elements'


const renderEmail = (flag) => {
  return flag ? <Badge value="信箱已認證" textStyle={{fontSize: 10}} containerStyle={{ backgroundColor: '#7b68ee', width: 77, marginRight: 10}} />
 : null
}

const renderPhoto = (flag) => {
  return flag ? <Badge value="照片已認證" textStyle={{fontSize: 10}} containerStyle={{ backgroundColor: '#ffa500', width: 77, marginRight: 10}} />
 : null
}

const Verified = inject("PreyStore")(observer(({ PreyStore }) => {
  return(
    <View style={{flexDirection: 'row', margin: 10}}>
      {renderEmail(PreyStore.emailVerified)}
      {renderPhoto(PreyStore.photoVerified)}
    </View>
  )
}))

export { Verified }