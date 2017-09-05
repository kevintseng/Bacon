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
  }

  pay = async () => {
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
        //const productId = 'android.test.purchased' // 'android.test.purchased'
        //console.warn(bonus)
        alert('錯誤')
      }
    } else {
      console.log("Platform is iOS")
    }
  }

  androidPay = async (bonus,productId) => {
      await InAppBilling.close()
      try {
        await InAppBilling.open()
        if (!await InAppBilling.isPurchased(productId)) {
          const details = await InAppBilling.purchase(productId)
          // console.log('You purchased: ', details);
        }
        const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId)
        // console.log('Transaction Status', transactionStatus);
        //console.log(transactionStatus.purchaseState)
        if (transactionStatus.purchaseState === 'PurchasedSuccessfully') {
          this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + bonus)
          this.SubjectStore.addBonus(bonus)
        }
        // const productDetails = await InAppBilling.getProductDetails(productId)
        // console.log(productDetails);
      } catch (err) {
        //console.log(err)
      } finally {
        await InAppBilling.consumePurchase(productId)
        await InAppBilling.close()
        Actions.AboutMe({type: 'reset'})
      }    
  }

  render() {
    return (
      <BaconRoutes
        routesText="儲值"
        routesOnPress={this.pay}
      />
    )
  }
}
