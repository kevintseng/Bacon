import React from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'


const Verification = (props) => {

  const { emailVerified, emailRightTitle, handleSendVerifyEmail, photoVerified, handleVerifyPhoto } = props
  return(
    <View>
      <View>
        { emailVerified ? 
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
              rightTitle = { emailRightTitle }
              rightTitleStyle = { { color: '#2962FF', paddingRight: 5 } }
              onPress = { handleSendVerifyEmail }
              hideChevron
              subtitle = '未完成'
            />
          }
      </View> 
      <View>
        { photoVerified ? 
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
              onPress = { handleVerifyPhoto }
              hideChevron
              subtitle = '未完成'
              />
          }    
      </View>
    </View>
  )
}

export { Verification }