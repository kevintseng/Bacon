import React, { Component } from 'react'
import { Platform, NativeModules } from 'react-native'
import { Actions } from 'react-native-router-flux'
import InAppBilling from 'react-native-billing'
import { observer, inject } from 'mobx-react'

import BaconRoutes from '../../views/BaconRoutes/BaconRoutes'

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

  componentWillMount() {
    // if (Platform.OS === 'ios') {
    //   const products = [
    //     'com.kayming.bacon.q_points_200',
    //     'com.kayming.bacon.q_points_600',
    //     'com.kayming.bacon.q_points_1200'
    //   ]
    //   InAppUtils.loadProducts(products, (error, products) => {
    //     //update store here.
    //     console.log('Products: ', products)
    //     console.log('Error: ', error)
    //   })
    // }
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
      console.log('iOS IAP Bonus #################')
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
        if (this.ControlStore.bonus[200]) {
          const productIdentifier = 'com.kayming.bacon.q_points_200'
          this.iOSPay(productIdentifier)
          bonus = 200
        }
        if (this.ControlStore.bonus[600]) {
          const productIdentifier = 'com.kayming.bacon.q_points_600'
          this.iOSPay(productIdentifier)
          bonus = 600
        }
        if (this.ControlStore.bonus[1200]) {
          const productIdentifier = 'com.kayming.bacon.q_points_1200'
          this.iOSPay(productIdentifier)
          bonus = 1200
        }
        this.SubjectStore.addBonus(bonus)
        await this.firebase
          .database()
          .ref(`users/${this.SubjectStore.uid}/bonus`)
          .set(this.SubjectStore.bonus + bonus)
          .then(() => {
            Actions.AboutMe({ type: 'reset' })
          })
      } catch (err) {
        console.log(err)
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
              .ref(`users/${this.SubjectStore.uid}/bonus`)
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
    return <BaconRoutes routesText='儲值' routesOnPress={() => this.pay()} />
  }
}
