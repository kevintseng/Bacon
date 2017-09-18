import React, { Component } from 'react'
import { Platform, NativeModules } from 'react-native'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

const { InAppUtils } = NativeModules


@inject('SubjectStore', 'ControlStore', 'firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.firebase = this.props.firebase
    this.purchaseState = null
  }

  pay = async () => {
    console.log("this.pay pressed")
    const bonus = parseInt(Object.keys(this.ControlStore.bonus).find(key => this.ControlStore.bonus[key] === true))
    if (Platform.OS === "android") {
      if (bonus === 1200) {
        const productId = 'q_points_1200' // 'android.test.purchased'
        this.androidPay(bonus,productId)
      } else if (bonus === 600) {
        const productId = 'q_points_600' // 'android.test.purchased'
        this.androidPay(bonus,productId)
      } else if (bonus === 200) {
        const productId = 'q_points_200' // 'android.test.purchased'
        this.androidPay(bonus,productId)
      } else {
        alert('錯誤')
      }
    } else {
      console.log("iOS IAP Bonus")
      try {
        console.log(this.ControlStore)
        let bonus = 0
        if (this.ControlStore.bonus[200]) {
          bonus = 200
        }
        if (this.ControlStore.bonus[600]) {
          bonus = 600
        }
        if (this.ControlStore.bonus[1200]) {
          bonus = 1200
        }
        this.SubjectStore.addBonus(bonus)
        await this.firebase.database()
        .ref(`users/${this.SubjectStore.uid}/bonus`)
        .set(this.SubjectStore.bonus + bonus).then(() => {
          Actions.AboutMe({type: 'reset'})
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  androidPay = async (bonus,productId) => {
    await InAppBilling.close()
    try {
      await InAppBilling.open()
      if (!await InAppBilling.isPurchased(productId)) {
        await InAppBilling.purchase(productId).then( details => {
          this.purchaseState = details.purchaseState
          if (this.purchaseState === 'PurchasedSuccessfully') {
            this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + bonus)
            this.SubjectStore.addBonus(bonus)
          }
        })
      }
    } catch (err) {
      alert('錯誤')
    } finally {
      if (this.purchaseState === 'PurchasedSuccessfully') {
        await InAppBilling.consumePurchase(productId)
        await InAppBilling.close()
        Actions.AboutMe({type: 'reset'})
      } else {
        await InAppBilling.close()
      }
    }
  }

  render() {
    return (
      <BaconRoutes
        routesText="儲值"
        routesOnPress={() => this.pay()}
      />
    )
  }
}
