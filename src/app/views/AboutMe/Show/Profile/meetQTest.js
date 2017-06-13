import React from 'react'
import { View, Platform, Text } from 'react-native'
import { observer } from 'mobx-react/native'


const styles = {
  BasicInfo: {
    ...Platform.select({
      ios: {
        height: 90,
        //flex: 1,
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

const meetQTest = observer(({ a,b,c }) => {

  return (
    <View style = { styles.BasicInfo }>
      <Text>{a}</Text>
      <Text>{b}</Text>
      <Text>{c}</Text>
    </View>
  )
})

export default meetQTest
