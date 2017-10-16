import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import BlankButton from '../../../views/BlankButton/BlankButton'

@inject('SubjectEditStore') @observer
export default class CityChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
    this.address_without_code = null
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({
      type: 'cities',
      country: 'TW'
    })
    .then((place) => {
      const address = place.address
      const postal_code = address.slice(0,3)
      if (Number.isInteger(parseInt(postal_code))) {
        this.address_without_code = address.slice(5,address.length)
      } else {
        this.address_without_code = address.slice(2,address.length)
      }
      if (this.address_without_code.length > 6) {
        const length = this.address_without_code.length - place.name.length
        this.address_without_code = this.address_without_code.slice(0,length)
      }
      this.SubjectEditStore.setAddress(this.address_without_code)
      this.SubjectEditStore.setLatitude(place.latitude)
      this.SubjectEditStore.setLongitude(place.longitude)
    })
    .catch(error => console.log(error.message))  // error is a Javascript Error object
  }

  current = () => {
    RNGooglePlaces.getCurrentPlace({
      type: 'cities',
      country: 'TW'
    })
    .then((results) => {
      const address = results[0].address
      const length = results[0].name.length
      this.address_without_code = address.slice(5,address.length - length)
      this.SubjectEditStore.setAddress(this.address_without_code)
    })
    .catch((error) => console.log(error))    
  }

  render() {
    return(
      <View style={{alignItems: 'center',marginTop: 50}}>
        <View>
          <BlankButton text='輸入常在城市' onPress={ this.openSearchModal } /> 
        </View>
        <View style={{marginTop: 20}}> 
          <BlankButton text='現在所在城市' onPress={ this.current } /> 
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text>{this.SubjectEditStore.address || '請輸入您的所在城市'}</Text>
        </View>
      </View>
    )
  }
}