import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Upgrade from '../../views/Bill/Upgrade'
import PolicyModalContainer from '../SettingAboutScene/PolicyModalContainer'
import RuleModalContainer from '../SettingAboutScene/RuleModalContainer'

const styles = {
  view: { 
    alignItems: 'center', 
    //marginTop: 10
  },
  link: {
    fontFamily: 'NotoSans',
    flexWrap: 'wrap',
    color: '#D63768',
    fontSize: 14,
  },
  text: {
    fontFamily: 'NotoSans',
    flexWrap: 'wrap',
    textAlign: 'center' 
  },
  warning : { 
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    bottom: -55
  },
  textView : { 
    width: 250, 
    marginTop: 50, 
    alignItems: 'center'
  }
}


@inject('ControlStore') @observer
export default class UpgradeContainer extends Component {
  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
    //this.state = {
    //  topCheck: true,
    //  upperCheck: false,
    //}
  }

  topCheckOnPress = () => {
    this.ControlStore.pickThreeMonthUpfrade()
    //this.setState({
    //  topCheck: !this.state.topCheck,
    //  upperCheck: !this.state.upperCheck,
    //})
  }

  upperCheckOnPress = () => {
    this.ControlStore.pickOneYearUpfrade()
    //this.setState({
    //  topCheck: !this.state.topCheck,
    //  upperCheck: !this.state.upperCheck,
    //})
  }

  render() {
    return (
      <View style={ styles.view }>
        <PolicyModalContainer/>
        <RuleModalContainer/>
        <Upgrade
          topCheck={ this.ControlStore.upgrade['3_month'] }
          upperCheck={ this.ControlStore.upgrade['1_year'] }
          topCheckOnPress={this.topCheckOnPress}
          upperCheckOnPress={this.upperCheckOnPress}
        />
        <View style={ styles.textView }>
          <Text style={ styles.text }>
            若您於高級會員服務訂閱期滿前未取消訂閱，將會於訂閱期滿自動續訂。
          </Text>
          <View style={ styles.warning }>
            <TouchableOpacity onPress={this.ControlStore.setSettingPolicyModal}>
              <Text style={styles.link}>服務條款  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.ControlStore.setSettingRuleModal}>
              <Text style={styles.link}>  個資保護政策</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
