import React from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { observer, inject } from 'mobx-react/native'


const Verification = inject("SubjectStore")(observer(({ SubjectStore }) => {

  return(
    <View>
      <View>
        { SubjectStore.emailVerified ? 
            <ListItem
            key='email'
            title='信箱認證'
            titleStyle = { { color: '#000000' } }
            hideChevron
            subtitle='已認證'
            /> :
            <ListItem
              key = 'email'
              title ='信箱認證'
              titleStyle = { { color: '#000000' } }
              rightTitle = "重寄認證信"
              rightTitleStyle = { { color: '#2962FF', paddingRight: 5 } }
              onPress = { SubjectStore.handleSendVerifyEmail.bind(SubjectStore) }
              hideChevron
              subtitle = '未完成'
            />
          }
      </View> 
      <View>
        { SubjectStore.photoVerified ? 
            <ListItem
              key = 'verifiedPhoto'
              title = '相片認證'
              titleStyle = { { color: '#000000' } }
              hideChevron
              subtitle = '已認證'
              /> :
            <ListItem
              key = 'verifiedPhoto'
              title = '相片認證'
              titleStyle = { { color: '#000000' } }
              rightTitle = '進行認證'
              rightTitleStyle = { { color: '#2962FF', paddingRight: 5 } }
              onPress = { SubjectStore.handleVerifyPhoto.bind(SubjectStore) }
              hideChevron
              subtitle = '未完成'
              />
          }    
      </View>
    </View>
  )
}))

export default Verification