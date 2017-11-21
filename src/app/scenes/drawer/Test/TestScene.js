import React, { Component } from 'react'
import { Modal, View, Text, ActivityIndicator, ScrollView, Dimensions, BackHandler, ToastAndroid, Button, Image, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import SquareImage from 'react-native-bacon-square-image'

const { width, height } = Dimensions.get('window')

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
         <SquareImage
            style={{ width, height: width }}
            customImagePlaceholderDefaultStyle={{ width, height: width }}
            //borderRadius={50}
            loadingStyle={{ size: 'large', color: '#b3b3b3' }}
            source={{ uri: 'http://news.cts.com.tw/photo/cts/201703/20170316-329467_bm.jpg' }}
            placeholderSource={require('../../../../images/ico_qy_head_preload.png')}
        />
      </View>
    )
  }
}
