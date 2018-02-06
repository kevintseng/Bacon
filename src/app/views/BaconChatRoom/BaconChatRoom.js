import React from 'react'
import { View, Image, Text, TextInput,TouchableOpacity, Dimensions } from 'react-native'
import { GiftedChat, Send, Composer, Bubble} from 'react-native-gifted-chat'
import BaconRedButton from '../BaconRedButton/BaconRedButton'
import BlankButton from '../BlankButton/BlankButton'
import Sticker from '../Sticker'

const { width, height } = Dimensions.get("window")

const styles = {
  view: {
    flex: 1
  },
  renderActions: {
    width: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  renderActionsImage: {
    height: 44,
    width: 44
  },
  giftedChat: {
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 0.5,
    borderColor: '#B3B3B3'
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  renderChatFooter: {
    alignItems: 'center',
    marginBottom: 10
  }
}

const BaconChatRoom = ({messages,onSend,user,onPressLeftIcon,onPressRightIcon,onPressAvatar,showChoose,showCutLine,chooseTopOnPress,chooseBottomOnPress,showLeftFooter,showRightFooter,onPressLeftFooterLeftIcon,onPressLeftFooterRightIcon}) => {

  const renderActions = () => {
    return (
      <View
        style={styles.renderActions}
      >
      <TouchableOpacity onPress={onPressLeftIcon}>
        <Image style={styles.renderActionsImage} source={showLeftFooter ? require('./img/bg_chat_chatbox_orange.png') : require('./img/btn_chat_add.png')} resizeMode={'center'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRightIcon}>
        <Image style={styles.renderActionsImage} source={showRightFooter ? require('./img/bg_chat_chatbox_orange.png') : require('./img/btn_chat_emoji.png')} resizeMode={'center'} />
      </TouchableOpacity>
      </View>
    )
  }

  const renderChatFooter = (props) => {
    if (showCutLine) {
      return(
        <View
          style={styles.renderChatFooter}
        >
          <BaconRedButton
            routesText={'插隊'} 
            routesOnPress={ chooseTopOnPress }
          />
        </View>
      )
    } else {
      return(
        <View
          style={styles.renderChatFooter}
        >
          <BaconRedButton
            routesText={'與他聊聊'} 
            routesOnPress={ chooseTopOnPress }
          />
          <BlankButton
            text={'不感興趣'} 
            onPress={ chooseBottomOnPress }
          />
        </View>
      )
    }
  }

  const renderSend = (props) => {
    return (
      <Send
         {...props}
         >
          <Image style={styles.renderActionsImage} source={require('./img/btn_chat_send.png')} resizeMode={'center'}/>
      </Send>
    )    
  }

  const renderBubble = (props) => {
    let leftBgColor = "#FFFFFF"
    let rightBgColor = "#99DD00"
    if (props.currentMessage.sticker || props.currentMessage.image) {
      leftBgColor = "transparent"
      rightBgColor = "transparent"
      //console.warn('有圖喔，泡泡要變透明')
    } 
    const wrapperStyle = {
      left: {
        backgroundColor: leftBgColor,
      },
      right: {
        backgroundColor: rightBgColor,
      } 
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={wrapperStyle}
      />
    )
  }

  return(
    <View style={styles.view}>
      <View style={[styles.giftedChat,{flex: showLeftFooter ? 10 : 2,}]}>
        <GiftedChat
          renderActions={renderActions}
          renderBubble={renderBubble}
          renderChatFooter={showChoose ? renderChatFooter : null}
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
          LoadEarlier={true}
          isLoadingEarlier={true}
          //bottomOffset={200}
          //minInputToolbarHeight={200}
          //composerHeight={30}
        />
      </View>
      <View style={[styles.bottom, showLeftFooter ? {} : {display: 'none'}]}> 
        <TouchableOpacity onPress={onPressLeftFooterLeftIcon}>
          <Image source={require('./img/btn_chat_album.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLeftFooterRightIcon}>
          <Image source={require('./img/btn_chat_shot.png')} />
        </TouchableOpacity>
      </View>
      <View style={[styles.view, showRightFooter ? {} : {display: 'none'}]}> 
        <Sticker/>
      </View>
    </View>
  )
}

export default BaconChatRoom
