import React from 'react'
import { View, Image, Text, TextInput,TouchableOpacity } from 'react-native'
import { GiftedChat, Send, Composer} from 'react-native-gifted-chat'

const BaconChatRoom = ({messages,onSend,user,onPressLeftIcon,onPressRightIcon,onPressAvatar}) => {

  const renderActions = () => {
    return (
      <View
        style={{
          width: 88,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          //paddingHorizontal: 10,
          //paddingVertical: 3,
          alignSelf: "center",
          //backgroundColor: 'blue'
        }}
      >
      <TouchableOpacity onPress={onPressLeftIcon}>
        <Image style={{height: 44,width: 44}} source={require('./img/btn_chat_add.png')} resizeMode={'center'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRightIcon}>
        <Image style={{height: 44,width: 44}} source={require('./img/btn_chat_emoji.png')} resizeMode={'center'} />
      </TouchableOpacity>
      </View>
    )
  }

  const renderComposer = (props) => {
    return(
      <Composer
         {...props}
         style={{height:44}}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send
         {...props}
         >
          <Image style={{height: 44,width: 44}} source={require('./img/btn_chat_send.png')} resizeMode={'center'}/>
      </Send>
    )    
  }

  return(
    <View style={{backgroundColor: '#F0F0F0',flex: 1 }}>
      <GiftedChat
        renderActions={renderActions}
        //renderComposer={renderComposer}
        renderSend={renderSend}
        messages={messages}
        onSend={onSend}
        user={user}
        placeholder={'請在此輸入您的訊息'}
        isAnimated // Animates the view when the keyboard appears
        //loadEarlier // Enables the "Load earlier messages" button
        onPressAvatar={onPressAvatar}
        renderAvatarOnTop
        label={'送出'}
        multiline={false}
        //composerHeight={30}
      />
    </View>
  )
}

export default BaconChatRoom
