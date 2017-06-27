import React from 'react'
import { View, Button } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { CheckBox } from 'react-native-elements'
import InAppBilling from "react-native-billing"


const pay = async() => {
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

const Credit = inject("SubjectStore")(observer(({ SubjectStore }) => {
  
  return(
    <View>
      <CheckBox
        title='儲值100點'
        checked={SubjectStore.creditButton}
        onPress={SubjectStore.setCredit.bind(SubjectStore)}
      />
      <Button onPress={pay} title="我要儲值" color="#841584" accessibilityLabel="Learn more about this purple button" />
    </View>
  )
}))

export default Credit