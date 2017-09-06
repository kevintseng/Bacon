import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Bonus from '../../views/Bill/Bonus'
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
export default class BonusContainer extends Component {

  constructor(props) {
    super(props)
    this.ControlStore = this.props.ControlStore
  }

  render() {
    return(
      <View style={{ alignItems: "center" }}>
        <PolicyModalContainer/>
        <RuleModalContainer/>
        <Bonus
          topCheck={ this.ControlStore.bonus[200] }
          middleCheck={ this.ControlStore.bonus[600] }
          upperCheck={ this.ControlStore.bonus[1200] }
          topCheckOnPress={ this.ControlStore.pickTwoHundredBonus }
          middleCheckOnPress={ this.ControlStore.pickFiveHundredBonus }
          upperCheckOnPress={ this.ControlStore.pickOneThousandBonus }
        />
        <View style={{ width: 160, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
          <TouchableOpacity onPress={this.ControlStore.setSettingPolicyModal}>
            <Text style={styles.link}>
              服務條款
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.ControlStore.setSettingRuleModal}>
            <Text style={styles.link}>
              個資保護政策
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
