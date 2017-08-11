import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

export default class BaconRoutesContainer extends Component {

  constructor(props) {
    super(props)
  }
  
  pay = async () => {
    const productId = 'abcde'//'android.test.purchased'
    await InAppBilling.close()
    try {
      await InAppBilling.open()
      if (!await InAppBilling.isPurchased(productId)) {
        const details = await InAppBilling.purchase(productId)
        console.log('You purchased: ', details);
      }
      const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId)
      console.log('Transaction Status', transactionStatus);
      const productDetails = await InAppBilling.getProductDetails(productId)
      console.log(productDetails);
    } catch (err) {
      console.log(err)
    } finally {
      await InAppBilling.consumePurchase(productId)
      await InAppBilling.close()
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