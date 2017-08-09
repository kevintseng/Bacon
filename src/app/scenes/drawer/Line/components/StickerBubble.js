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
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
})

export default class StickerBubble extends Component {
  render() {
    if (this.props.currentMessage.sticker) {
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <Image
            style={{ width: 120, height: 99}}
            source={require(`../../../../stickers/${this.props.currentMessage.sticker}.png`)}
          />
        </View>
      )
    }
    return null
  }
}
