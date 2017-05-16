import React from "react"
import { View } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Badge } from 'react-native-elements'


const renderEmail = (flag) => {
  return flag ? "信箱認證" : "信箱未認證"
}

const renderPhoto = (flag) => {
  return flag ? "照片認證" : "照片未認證"
}

const Verified = inject("store")(observer(({ store }) => {
  return(
    <View style={{flexDirection: 'row'}}>
      <Badge value={renderEmail(store.user.emailVerified)} textStyle={{fontSize: 10}} containerStyle={{ backgroundColor: '#7b68ee', width: 90}} />
      <Badge value={renderPhoto(store.user.emailVerified)} textStyle={{fontSize: 10}} containerStyle={{ backgroundColor: '#ffa500', width: 90}} />
    </View>
  )
}))

export { Verified }