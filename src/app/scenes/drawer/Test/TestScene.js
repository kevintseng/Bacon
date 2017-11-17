import React, { Component } from 'react'
import { Modal, View, Text, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button, Image, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ImageLoad from 'react-native-image-placeholder'

export default class TestScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumZoom: false
    }
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  render() {
    return(
      <View style={{alignItems: 'center'}}>
         <ImageLoad
            style={{ width: 100, height: 100 }}
            borderRadius={50}
            loadingStyle={{ size: 'large', color: '#d63768' }}
            source={{ uri: 'https://4.bp.blogspot.com/-lYq2CzKT12k/VVR_atacIWI/AAAAAAABiwk/ZDXJa9dhUh8/s0/Convict_Lake_Autumn_View_uhd.jpg' }}
            placeholderSource={require('../../../../images/ico_qy_head_preload.png')}
        />
      </View>
    )
  }
}
