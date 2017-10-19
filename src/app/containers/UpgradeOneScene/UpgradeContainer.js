import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Upgrade from '../../views/Bill/Upgrade'
import PolicyModalContainer from '../SettingAboutScene/PolicyModalContainer'
import RuleModalContainer from '../SettingAboutScene/RuleModalContainer'

const styles = {
  link: {
    fontFamily: 'NotoSans',
    flexWrap: 'wrap',
    color: '#D63768',
    fontSize: 14,
  },
  text: {
    fontFamily: 'NotoSans',
    flexWrap: 'wrap',
    color: '#606060',
    fontSize: 11,
    alignItems: 'center',
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
      <View style={{ alignItems: 'center', marginTop: 10, }}>
        <PolicyModalContainer/>
        <RuleModalContainer/>
        <Upgrade
          topCheck={ this.ControlStore.upgrade['3_month'] }
          upperCheck={ this.ControlStore.upgrade['1_year'] }
          topCheckOnPress={this.topCheckOnPress}
          upperCheckOnPress={this.upperCheckOnPress}
        />
        <View style={{ width: 250, marginTop: 15, alignItems: 'center' }}>
          <View style={{ width: 160, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
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
        { Platform.OS === 'ios' &&
          <View style={{ marginTop: 10, width: 320}}>
            <Text style={styles.text}>當您按下「升級」並使用確認付費升級為高級會員後將從您的iTunes帳號收費。</Text>
            <Text style={styles.text}>您的高級會員資格將於訂閱效期滿前24小時內自動續訂並將從您的iTunes帳號扣取費用。</Text>
            <Text style={styles.text}>若需取消自動續訂，請在您的iTunes帳號變更您的訂閱設定。</Text>
          </View>
        }
      </View>
    )
  }
}
