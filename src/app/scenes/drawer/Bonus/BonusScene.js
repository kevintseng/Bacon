import React, { Component } from 'react'
import { View, Text, Platform, BackHandler, ToastAndroid, TouchableOpacity } from 'react-native'
//import { inject, observer } from 'mobx-react'
//import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import BonusContainer from './containers/BonusContainer'
import BonusTitleContainer from  './containers/BonusTitleContainer/BonusTitleContainer'
//import PolicyModalContainer from './containers/PolicyModalContainer'
import PolicyModal from '../../../views/PolicyModal'
import RuleModal from '../../../views/RuleModal'

const styles = {
  ...Platform.select({
    ios: {
      view: {
        flex: 1,
      },
      top: {
        marginTop: 10,
        height: 120
      },
      middle: {
        marginTop: 10,
        alignSelf: 'center',
        height: 150,
      },
      textView: {
        marginTop: 10,
        alignSelf: 'center',
        height: 40,
      },
      bottom: {
        position: 'absolute',
        bottom: 0
      },
      text: {
        fontFamily: 'NotoSans',
        flexWrap: 'wrap',
        color: '#D63768',
        fontSize: 14,
      },
      warning: {
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 300,
      },
    },
    android: {
      view: {
        flex: 1
      },
      top: {
        position: 'absolute',
        top: 30,
        alignSelf: 'center',
      },
      middle: {
        position: 'absolute',
        top: 160,
        alignSelf: 'center',
      },
      textView: {
        position: 'absolute',
        bottom: 200,
        alignSelf: 'center',
      },
      bottom: {
        position: 'absolute',
        bottom: 0
      },
      text: {
        fontFamily: 'NotoSans',
        color: '#D63768',
        fontSize: 14,
      },
      warning: {
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 185,
        //backgroundColor: 'red',
        //paddingLeft: 15
      }
    }
  })
}

//@inject('ControlStore') @observer
export default class BonusScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      policy: false,
      rule: false
    }
    //this.ControlStore = this.props.ControlStore
  }


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  openPolicy = () => {
    this.setState({
      policy: true
    })
  }

  closePolicy = () => {
    this.setState({
      policy: false
    })    
  }

  openRule = () => {
    this.setState({
      rule: true
    })    
  }

  closeRule = () => {
    this.setState({
      rule: false
    })    
  }

  render() {
    return(
      <View style={ styles.view }>
        <PolicyModal
          visible={this.state.policy}
          onRequestClose={this.closePolicy}
        />
        <RuleModal
          visible={this.state.rule}
          onRequestClose={this.closeRule}
        />
        <View style={ styles.top }>
          <BonusTitleContainer/>
        </View>

        <View style={ styles.middle }>
          <BonusContainer/>
        </View>

        <View style={ styles.warning }>
          <TouchableOpacity onPress={this.openRule}>
            <Text style={ styles.text }> 使用條款 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openPolicy}>
            <Text style={ styles.text }> 隱私政策 </Text>
          </TouchableOpacity>
        </View>


        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>

      </View>
    )
  }
}
