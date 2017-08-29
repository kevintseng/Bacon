import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'
import { NativeModules } from 'react-native'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

const { InAppUtils } = NativeModules

@inject('SubjectStore', 'firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
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

      InAppUtils.loadProducts(products, (error, products) => {
        console.log("loadProducts: ", products, " error: ", error)
      })

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
