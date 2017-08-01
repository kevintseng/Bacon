import React, { Component } from 'react'
import { Dimensions, Image, View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import ImageZoom from 'react-native-image-pan-zoom'

const { width, height } = Dimensions.get('window')

@inject('SubjectStore') @observer
export default class CourtContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
    <View>
      <Image style={{width, height: width, borderRadius: 10}} source={{uri: this.SubjectStore.photoURL}}/>
    </View>
    )
  }
}