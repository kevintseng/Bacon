import React, { Component } from 'react'
import { View, Image, ActivityIndicator, Dimensions, BackHandler, ToastAndroid, TouchableOpacity, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import BaconCard from 'react-native-bacon-card'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    flex: 1
  },
  tool : {
    flexDirection: 'row',
    position: 'absolute', 
    justifyContent: 'space-around',
    top: height/2, 
    width
  }
}

@inject('firebase','SubjectStore','FateStore','ControlStore','MeetChanceStore','ChatStore') @observer
export default class ChatCourtScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.state = {
      //collection: this.props.collection,
      loading: true
    }
    //this.ChatStore = this.props.ChatStore
    //this.title = this.props.title
    //this.collection = this.props.collection
    //this.Store = this.props.Store // MeetChanceStore FateStore
    //this.SubjectStore = this.props.SubjectStore
    //this.FateStore = this.props.FateStore
    //this.ControlStore = this.props.ControlStore
    //this.MeetChanceStore = this.props.MeetChanceStore
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    //this.ChatStore.startLoading()
    this.setState({
      loading: true
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      })
    })
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  render() {
    return(
      <View style={styles.view}> 
      { this.state.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
          <BaconCard/>
          <View style={styles.tool}>
            <TouchableOpacity onPress={ this.onPressLeft }>
              <Image source={require('../../../../../images/btn_qy_fav_0.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../../images/btn_qy_chat.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      }    
      </View>
    )
  }
}

/*
     { this.state.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
          <BaconCard
            bio={ 'aaaaa' }
            age={ 20 }
            langs={ '中文' }
            distance={ 30 }
            address={ '新北市板橋區自強里' }
          />
          <View style={styles.tool}>
            <TouchableOpacity onPress={ this.onPressLeft }>
              <Image source={require('../../../../../images/btn_qy_fav_0.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../../images/btn_qy_chat.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      }
*/
