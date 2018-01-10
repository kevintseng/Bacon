import React, { Component } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { inject, observer } from 'mobx-react'

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
      <Image 
        style={{width, height: width}} 
        source={{uri: this.SubjectStore.avatar}}
        />
    </View>
    )
  }
}