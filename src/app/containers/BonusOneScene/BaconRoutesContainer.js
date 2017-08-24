import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'
import { NativeModules } from 'react-native'

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
    const productId = 'android.test.purchased' // 'android.test.purchased'
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
        const bonus = parseInt(Object.keys(this.ControlStore.bonus).find(key => this.ControlStore.bonus[key] === true))
        
        this.firebase.database().ref(`users/${this.SubjectStore.uid}/bonus`).set(this.SubjectStore.bonus + bonus)
        this.SubjectStore.addBonus(bonus)
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
