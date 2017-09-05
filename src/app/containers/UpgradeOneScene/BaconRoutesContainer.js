import React, { Component } from 'react'
import { Platform, NativeModules } from 'react-native'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'
import iapReceiptValidator from 'iap-receipt-validator'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

const { InAppUtils } = NativeModules
// Shared Secret from iTunes connect
const password = 'd882b9dc156a47b4ae2ff9a094fc53c5'
// use sandbox or production url for validation
const production = false
const validateReceipt = iapReceiptValidator(password, production)

@inject('SubjectStore','ControlStore','firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.firebase = this.props.firebase
  }

  async validate(receiptData) {
    try {
      const validationData = await validateReceipt(receiptData);
      console.log("validateionData: ", validationData)
          // check if Auto-Renewable Subscription is still valid
          // validationData['latest_receipt_info'][0].expires_date > today
    } catch (err) {
      console.log(err.valid, err.error, err.message)
    }
  }

  pay = async () => {
    if (Platform.OS === "android") {
      const upgrade_way = Object.keys(this.ControlStore.upgrade).find(key => this.ControlStore.upgrade[key] === true)
      if (upgrade_way === '3_month') {
        const productId = 'premium_3m' // 'android.test.purchased'
        this.androidPay(productId)
      } else if (upgrade_way === '1_year') {
        const productId = 'premium_1y' // 'android.test.purchased'
        this.androidPay(productId)
      } else {
        alert('錯誤')
      }      
    } else {
      const pid = "premium_3m"
      const products = ["q_points_200", "q_points_600", "q_points_1200"]
      try {
        InAppUtils.loadProducts(products, (error, products) => {
          console.log("loadProducts: ", products, " error: ", error)
          InAppUtils.receiptData((err, receiptData) => {
            console.log("receiptData: ", receiptData)
            this.validate(receiptData)
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  androidPay = async (productId) => {
    await InAppBilling.close()
    try {
      await InAppBilling.open()
      if (!await InAppBilling.isPurchased(productId)) {
        await InAppBilling.purchase(productId).then( details => {
          this.purchaseState = details.purchaseState
          if (this.purchaseState === 'PurchasedSuccessfully') {
            this.firebase.database().ref(`users/${this.SubjectStore.uid}/vip`).set(true)
            this.SubjectStore.setVip(true)
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
        routesText="升級"
        routesOnPress={this.pay}
      />
    )
  }
}
