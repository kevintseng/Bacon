import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button, Alert } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places'

import BlankButton from '../../views/BlankButton/BlankButton'

@inject('SignUpStore') @observer
export default class CityChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({
      type: 'cities',
      country: 'TW'
    })
    .then((place) => {
    //console.log(place)
      this.SignUpStore.setAddress(place.name)
      this.SignUpStore.setLatitude(place.latitude)
      this.SignUpStore.setLongitude(place.longitude)
    }).catch(error => console.log(error.message))
  }

  current = () => {
    RNGooglePlaces.getCurrentPlace({
      type: 'cities',
      country: 'TW'
    })
    .then((results) => {
      this.SignUpStore.setAddress(results[0].name)
      console.log(results)
    })
    .catch(error => Alert.alert( 
    '定位錯誤', error.message, [ 
      {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
    ))
  }

  render() {
    return(
      <View>
        <View>
          <BlankButton text='輸入常在城市' onPress={ this.openSearchModal } /> 
        </View>
        <View style={{marginTop: 20}}> 
          <BlankButton text='現在所在城市' onPress={ this.current } /> 
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text>{this.SignUpStore.address || '請輸入您的所在位置'}</Text>
        </View>       
      </View>
    )
  }
}