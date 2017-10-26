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

  componentDidMount() {
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
    }
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
        const productId = 'com.kayming.bacon.premium_3m' // 'android.test.purchased'
        this.androidPay(productId)
      } else if (upgrade_way === '1_year') {
        const productId = 'com.kayming.bacon.premium_1y' // 'android.test.purchased'
        this.androidPay(productId)
      } else {
        alert('錯誤')
      }
    } else {
      console.log('iOS IAP Upgrade #################')
      InAppUtils.canMakePayments(enabled => {
        if (enabled) {
          console.log('IAP enabled')
        } else {
          console.log('IAP disabled')
        }
      })

      try {
        console.log(this.ControlStore)
        let bonus = 0
        if (this.ControlStore.upgrade['3_months']) {
          const productIdentifier = 'com.kayming.bacon.q_points_200'
          this.iOSPay(productIdentifier)
        }
        if (this.ControlStore.bonus['1_year']) {
          const productIdentifier = 'com.kayming.bacon.q_points_600'
          this.iOSPay(productIdentifier)
        }
        this.firebase.database().ref(`users/${this.SubjectStore.uid}/vip`).set(true)
        this.SubjectStore.setVip(true)
      } catch (err) {
        console.log(err)
      } finally {
        Actions.AboutMe({type: 'reset'})
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

  iOSPay = async productId => {
    console.log('Purchasing iOS product: ', productId)
    try {
      await InAppUtils.purchaseProduct(productId, (error, response) => {
        console.log('response: ', response)
        // NOTE for v3.0: User can cancel the payment which will be available as error object here.
        if (response && response.productIdentifier) {
          console.log(
            'Purchase Successful',
            'Your Transaction ID is ' + response.transactionIdentifier
          )
          //unlock store here.
        } else {
          console.log('IAP error: ', error)
        }
      })
    } catch (err) {
      alert('錯誤')
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
