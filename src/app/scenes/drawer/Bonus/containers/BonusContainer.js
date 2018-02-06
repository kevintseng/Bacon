import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Button, Platform, NativeModules } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import Bonus from '../../../../views/Bill/Bonus'
import PolicyModalContainer from '../../Setting/SettingEdit/containers/SettingAbout/PolicyModalContainer'
import RuleModalContainer from '../../Setting/SettingEdit/containers/SettingAbout/RuleModalContainer'

const { InAppUtils } = NativeModules

const styles = {
  link: {
    fontFamily: 'NotoSans',
    flexWrap: "wrap",
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

  componentWillMount() {
    if (Platform.OS === 'ios') {
      const products = [
        'com.kayming.bacon.q_points_200',
        'com.kayming.bacon.q_points_600',
        'com.kayming.bacon.q_points_1200',
        'com.kayming.bacon.premium_1y',
        'com.kayming.bacon.premium_3m'
      ]
      InAppUtils.loadProducts(products, (error, products) => {
        //update store here.
        console.log('Products: ', products)
        console.log('Error: ', error)
      })
    }
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
      </View>
    )
  }
}
