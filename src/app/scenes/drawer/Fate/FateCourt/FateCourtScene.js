import React, { Component } from 'react'
import { View, Dimensions, BackHandler, ToastAndroid, InteractionManager, TouchableOpacity, Image } from 'react-native'
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

@inject('firebase','SubjectStore','FateStore','ControlStore') @observer
export default class FateCourtScene extends Component {

  constructor(props) {
    super(props)
    //this.firebase = this.props.firebase
    //this.FateStore = this.props.FateStore
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.setState({
      loading: true
    })
  }

  componentDidMount() {
    //this.FateStore.fetchPrey()
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      })
    })
  }

  componentWillUnmount(){
    //this.FateStore.cleanFetch()
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
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
              <Image source={require('../../../../../images/btn_meet_dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../../images/btn_meet_like.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
    )
  }
}