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
    flexWrap: 'wrap',
    color: '#D63768',
    fontSize: 14,
  },
  text: {
    fontFamily: 'NotoSans',
    flexWrap: 'wrap',
    color: '#606060',
    fontSize: 14,
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
          <Text style={styles.text}>若需要取消訂閱或自動續訂, 請直接在您的iTunes帳號取消或變更您的訂閱設定。</Text>
          <Text style={styles.text}>所有自動續訂將在有效期滿前24小時之內續訂並將從您的iTunes帳號扣取訂閱費用。</Text>
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
            <Text style={styles.text}>確認要升級為高級會員並立即使用您的iTunes帳號來完成訂閱付費？</Text>
          </View>
        </View>
      </View>
    )
  }
}
