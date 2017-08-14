import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

@inject('SubjectStore','firebase') @observer
export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.firebase = this.props.firebase
  }

  pay = async () => {
    const productId = 'android.test.purchased'//'android.test.purchased'
    await InAppBilling.close()
    try {
      await InAppBilling.open()
      if (!await InAppBilling.isPurchased(productId)) {
        const details = await InAppBilling.purchase(productId)
        //console.log('You purchased: ', details);
      }
      const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId)
      //console.log('Transaction Status', transactionStatus);
      console.log(transactionStatus.purchaseState)
      if (transactionStatus.purchaseState ==='PurchasedSuccessfully') {
        this.firebase.database().ref('users/' + this.SubjectStore.uid + '/vip').set(true)
        this.SubjectStore.setVip(true)
      }
      //const productDetails = await InAppBilling.getProductDetails(productId)
      //console.log(productDetails);
    } catch (err) {
      console.log(err)
    } finally {
      await InAppBilling.consumePurchase(productId)
      await InAppBilling.close()
      Actions.AboutMe({type: 'reset'})
    }
  }

  render() {
    return(
      <BaconRoutes
        routesText='升級'
        routesOnPress={ this.pay } 
      />
    )
  }
}