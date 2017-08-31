import React from "react"
import {
  View,
  Text,
  Platform
} from "react-native"
import { Actions } from "react-native-router-flux"
// import { observer } from "mobx-react/native"
import {
  ListItem,
  Badge,
} from "react-native-elements"
import Moment from "moment"

const getAvatarStyle = (onlineStatus, chatStatus) => {
  if (onlineStatus && chatStatus) {
    return {
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: "#06E300",
    }
  } else if (!onlineStatus && chatStatus) {
    return {
      height: 60,
      width: 60,
      borderRadius: 30,
    }
  } else if (onlineStatus && !chatStatus) {
    return {
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: "#06E300",
    }
  }
  return {
    height: 60,
    width: 60,
    borderRadius: 30,
  }
}

const getAvatarContainerStyle = (status) => {
  if (status == 0) {
    return {
      marginTop: Platform.OS === 'ios' ? -10 : 0,
      height: 60,
      width: 60,
      borderRadius: 30,
    }
  }
  return {
    height: 60,
    width: 60,
    borderRadius: 30,
  }
}

const getChatStatus = (status) => {
  switch (status) {
    case 0:
      return "我的狀態"
    case 1:
      return "放空中"
    case 2:
      return "忙碌中"
    case 3:
      return "低潮中"
    default:
      return status
  }
}

const handlePriority = (priority) => {
  if (priority > 0) return {}
  if (priority == 0) return { name: "flag", color: "#F0D64E" }
}

const getStatusBadgeColor = (status) => {
  // console.log("getStatusBadgeColor: ", status)
  switch (status) {
    case 0: // "我的狀態"
      return "transparent"
    case 1: // "放空中"
      return "#FFD320"
    case 2: // "忙碌中"
      return "#FF6600"
    case 3: // "低潮中"
      return "#2A66F8"
    default:
      return "#D76D6D"
  }
}

const getStatusTextColor = (status) => {
  // console.log("getStatusTextColor: ", status)
  switch (status) {
    case 0: // "我的狀態"
      return "transparent"
    case 1: // "放空中"
      return "#606060"
    case 2: // "忙碌中"
      return "white"
    case 3: // "低潮中"
      return "white"
    default:
      return "white"
  }
}

const renderTitle = (name, birthday, status) => {
  // console.log("renderTitle: status", status)

  const age = birthday
    ? Moment().diff(birthday, "years")
    : ""

  if (status == 0) {
    return (
      <Text style={{fontWeight: "500", fontSize: 18, marginLeft: 30}}>
        {name}, {age}
      </Text>
    )
  }

  return (
    <View>
      <Text style={{fontWeight: "500", fontSize: 18, marginLeft: 30}}>
        {name}, {age}
      </Text>
      <View style={{marginLeft: 28, marginVertical: 3, flexDirection: "row"}}>
        <Badge
          containerStyle={{
            backgroundColor: getStatusBadgeColor(status),
            padding: 5,
          }}
        >
          <Text style={{fontSize: 11, color: getStatusTextColor(status)}}>
            {getChatStatus(status)}
          </Text>
        </Badge>
      </View>
    </View>
  )
}

const renderUnread = (unread, chatStatus) => {
  if (unread == 0) {
    return false
  }

  if (chatStatus != 0) {
    return { value: unread, textStyle: { color: "white", fontSize: 11 }, containerStyle: { marginTop: 21, backgroundColor: "red", padding: 6 } }
  }

  return { value: unread, textStyle: { color: "white", fontSize: 11 }, containerStyle: { marginTop: 10, backgroundColor: "red", padding: 6 } }
}

const Conversation = props => (
  <ListItem
    containerStyle={{
      height: 90,
      borderBottomWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
    roundAvatar
    avatar={{ uri: props.conv.avatar }}
    avatarOverlayContainerStyle={getAvatarContainerStyle(props.conv.chatStatus)}
    avatarStyle={getAvatarStyle(props.conv.online, props.conv.chatStatus)}
    avatarContainerStyle={{backgroundColor: 'transparent', height: 60, width: 60, borderRadius: 30}}
    key={props.conv.key}
    title={renderTitle(props.conv.name, props.conv.birthday, props.conv.chatStatus)}
    badge={renderUnread(props.conv.unread, props.conv.chatStatus)}
    subtitle={props.conv.subtitle}
    subtitleContainerStyle={{ marginLeft: 20}}
    rightIcon={handlePriority(props.conv.priority)}
    onPress={() => {
      Actions.Line({
        uid: props.conv.uid,
        convKey: props.conv.convKey,
      })
    }}
  />
)

export default Conversation
