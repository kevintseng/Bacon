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

@inject('SubjectStore', 'firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
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
    if (!Platform.OS === 'ios') {
      const productId = 'android.test.purchased'// 'android.test.purchased'
      await InAppBilling.close()
      try {
        await InAppBilling.open()
        if (!await InAppBilling.isPurchased(productId)) {
          const details = await InAppBilling.purchase(productId)
          // console.log('You purchased: ', details);
        }
        const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId)
        // console.log('Transaction Status', transactionStatus);
        console.log(transactionStatus.purchaseState)
        if (transactionStatus.purchaseState === 'PurchasedSuccessfully') {
          this.firebase.database().ref(`users/${this.SubjectStore.uid}/vip`).set(true)
          this.SubjectStore.setVip(true)
        }
        // const productDetails = await InAppBilling.getProductDetails(productId)
        // console.log(productDetails);
      } catch (err) {
        console.log(err)
      } finally {
        await InAppBilling.consumePurchase(productId)
        await InAppBilling.close()
        Actions.AboutMe({type: 'reset'})
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

      // InAppUtils.canMakePayments(async (enabled) => {
      //   if (enabled) {
      //     const productId = "premium_3m"
      //     try {
      //       await InAppUtils.purchaseProduct(productId, (error, response) => {
      //         if (response && response.productIdentifier) {
      //           console.log("IAP response: ", response)
      //           // this.firebase.database().ref(`users/${this.SubjectStore.uid}/vip`).set(true)
      //           // this.SubjectStore.setVip(true)
      //         }
      //       })
      //     } catch (err) {
      //       console.log(err)
      //     } finally {
      //       // await InAppBilling.consumePurchase(productId)
      //       // await InAppBilling.close()
      //       Actions.AboutMe({type: 'reset'})
      //     }
      //   } else {
      //     console.error('IAP disabled');
      //   }
      // })
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
