import React from 'react'
import { View, Platform } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Item } from './Components/Item'

const styles = {
  BasicInfo: {
    ...Platform.select({
      ios: {
        height: 90,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10
      },
      android: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10
      },
    }),
  },
  Avatar: {
    ...Platform.select({
      ios: {
        flex: 1,
        paddingVertical: 5
      },
      android: {
        flex: 1,
        paddingVertical: 5,
          //alignItems: 'center'
      },
    }),
  },
  Infomation: {
    ...Platform.select({
      ios: {
        marginLeft: 80,
        width: 200
      },
      android: {
        marginLeft: 0,
        width: 200
      }
    })
  },
  Field: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
}


const BasicInfo = (props) => {
  // API
  const { avatar, displayName, location, onpressDisplayName, onpressLocation } = props

  // return
  return (
    <View style = { styles.BasicInfo }>
      <View style = { styles.Avatar }>
        <Avatar
          large
          rounded
          icon = { { type: 'user' } }
          onPress = { () => console.log("Works!") }
          containerStyle = { { flex: 1 } }
          activeOpacity = { 0.7 }
          source = { { uri: avatar } }
        />
      </View>

      <View style = { styles.Infomation }>
        <Item displayTitle title = { displayName } tag = "編輯" onpress = { onpressDisplayName}></Item>
        <Item displayTitle title = { location } tag = "編輯" onpress = { onpressLocation }></Item>
      </View>     
    </View>
  )
}

export { BasicInfo }
