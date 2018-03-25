import React, { Component } from 'react'
import { Platform, NativeModules } from 'react-native'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'

import BaconRoutes from '../../../../views/BaconRoutes/BaconRoutes'

const { InAppUtils } = NativeModules

@inject('SubjectStore', 'ControlStore', 'firebase')
@observer
export default class BaconRoutesContainer extends Component {
  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.ControlStore = this.props.ControlStore
    this.firebase = this.props.firebase
    this.purchaseState = null
  }

  componentDidMount() {
    /*
    if (Platform.OS === 'ios') {
      InAppUtils.restorePurchases((error, products) => {
        if (error) {
          console.log('itunes Error', 'Could not connect to itunes store.')
        } else {
          console.log(
            'Restore Successful',
            'Successfully restores all your purchases.'
          )
          //unlock store here again.
        }
      })
    }*/
  }

  pay = async () => {
    const bonus = parseInt(
      Object.keys(this.ControlStore.bonus).find(
        key => this.ControlStore.bonus[key] === true
      )
    )
    if (Platform.OS === 'android') {
      if (bonus === 1200) {
        const productId = 'q_points_1200' // 'android.test.purchased'
        this.androidPay(bonus, productId)
      } else if (bonus === 600) {
        const productId = 'q_points_600' // 'android.test.purchased'
        this.androidPay(bonus, productId)
      } else if (bonus === 200) {
        const productId = 'q_points_200' // 'android.test.purchased'
        this.androidPay(bonus, productId)
      } else {
        alert('錯誤')
      }
    } else {
      //console.log('iOS IAP Bonus #################'
      if (bonus === 1200) {
        const productIdentifier = 'com.kayming.bacon.q_points_1200'
        this.iOSPay(bonus,productIdentifier)
      } else if (bonus === 600) {
        const productIdentifier = 'com.kayming.bacon.q_points_600'
        this.iOSPay(bonus,productIdentifier)
      } else if (bonus === 200) {
        const productIdentifier = 'com.kayming.bacon.q_points_200'
        this.iOSPay(bonus,productIdentifier)
      } else {
        alert('error')
      }
    }
  }

  androidPay = async (bonus, productId) => {
    await InAppBilling.close()
    try {
      await InAppBilling.open()
      if (!await InAppBilling.isPurchased(productId)) {
        await InAppBilling.purchase(productId).then(details => {
          this.purchaseState = details.purchaseState
          if (this.purchaseState === 'PurchasedSuccessfully') {
            this.firebase
              .database()
              .ref(`bonus/${this.SubjectStore.uid}`)
              .set(this.SubjectStore.bonus + bonus)
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
        Actions.AboutMe({ type: 'reset' })
      } else {
        await InAppBilling.close()
      }
    }
  }

  iOSPay = (bonus,productId) => {
      InAppUtils.loadProducts([productId], (error, products) => {
        InAppUtils.canMakePayments((canMakePayments) => {
           if(!canMakePayments) {
              Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
           } else {
             InAppUtils.purchaseProduct(productId, (error, response) => {
              if (response && response.productIdentifier) {
                //alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
                //unlock store here.
                this.firebase
                  .database()
                  .ref(`bonus/${this.SubjectStore.uid}`)
                  .set(this.SubjectStore.bonus + bonus)
                this.SubjectStore.addBonus(bonus)
                Actions.AboutMe({ type: 'reset' })
              } else {
                alert('IAP error: ', response)
              }
            })
           }
        })
      });
  }

  render() {
    return <BaconRoutes routesText='儲值' routesOnPress={() => this.pay()} />
  }
}
