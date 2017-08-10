import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Platform,
  Image,
} from "react-native"

const styles = StyleSheet.create({
  container: {
  },
})

export default class StickerBubble extends Component {
  render() {
    if (this.props.currentMessage.sticker) {
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <Image
            {...props} 
            style={{ width: 120, height: 99}}
            source={require(`./stickers/${this.props.currentMessage.sticker}.png`)}
          />
        </View>
      )
    }
    return null
  }
}
