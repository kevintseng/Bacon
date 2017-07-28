import React, { Component } from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { inject, observer } from "mobx-react"
import InAppBilling from "react-native-billing"
import { NativeModules } from 'react-native'

const { InAppUtils } = NativeModules

const googlePlay = async() => {
  const productId = 'android.test.purchased'
  await InAppBilling.close();
  try {
    await InAppBilling.open();
    if (!await InAppBilling.isPurchased(productId)) {
      const details = await InAppBilling.purchase(productId);
      console.log('You purchased: ', details);
    }
    const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId);
    console.log('Transaction Status', transactionStatus);
    const productDetails = await InAppBilling.getProductDetails(productId);
    console.log(productDetails);
  } catch (err) {
    console.log(err);
  } finally {
    await InAppBilling.consumePurchase(productId);
    await InAppBilling.close();
  }
}

const appleStore = () => {
  const productIdentifier = 'com.xyz.abc';
  InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
   if(error) {
      alert('itunes Error', 'Could not connect to itunes store.');
   } else {
      alert('Restore Successful', 'Successfully restores all your purchases.');
      
      if (response.length === 0) {
        alert('No Purchases', "We didn't find any purchases to restore.");
        return;
      }

      response.forEach((purchase) => {
        if (purchase.productIdentifier === 'com.xyz.abc') {
          // Handle purchased product.
        }
      });
   }
  });
}

@inject("SubjectStore") @observer
export default class AboutMeEditScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
  }

  render(){
    return(
    <View>
      <Button onPress={ Platform.OS === 'ios' ? appleStore : googlePlay } title="我要儲值" color="#841584" accessibilityLabel="Learn more about this purple button" />
    </View>
    )
  }
}