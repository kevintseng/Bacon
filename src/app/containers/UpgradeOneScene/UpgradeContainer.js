import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Upgrade from '../../views/Bill/Upgrade'
import PolicyModalContainer from '../SettingAboutScene/PolicyModalContainer'
import RuleModalContainer from '../SettingAboutScene/RuleModalContainer'

const styles = {
  link: {
    fontFamily: 'NotoSans',
    flexWrap: "wrap",
    color: "#D63768",
    fontSize: 14,
  },
  text: {
    fontFamily: 'NotoSans',
    flexWrap: "wrap",
  },
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
      <View style={{ alignItems: "center" }}>
        <PolicyModalContainer/>
        <RuleModalContainer/>
        <Upgrade
          topCheck={ this.ControlStore.upgrade['3_month'] }
          upperCheck={ this.ControlStore.upgrade['1_year'] }
          topCheckOnPress={this.topCheckOnPress}
          upperCheckOnPress={this.upperCheckOnPress}
        />
        <View style={{ width: 250, marginTop: 15, alignItems: "center" }}>
          <Text style={ styles.text }>
            若您於高級會員服務訂閱期滿前未取消訂閱，將會於訂閱期滿自動續訂。
          </Text>
          <View style={{ width: 160, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20}}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={this.ControlStore.setSettingPolicyModal}>
              <Text style={styles.link}>
                服務條款
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={this.ControlStore.setSettingRuleModal}>
              <Text style={styles.link}>
                個資保護政策
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
