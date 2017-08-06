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
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({
      type: 'cities',
      country: 'TW'
    })
    .then((place) => {
    console.log(place);
    this.SubjectEditStore.setAddress(place.address)
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  current = () => {
    RNGooglePlaces.getCurrentPlace({
      type: 'cities',
      country: 'TW'
    })
    .then((results) => {
      this.SubjectEditStore.setAddress(results[0].address)
      console.log(results)
    }
      )
    .catch((error) => console.log(error));    
  }

  render() {
    return(
      <View style={{alignItems: 'center'}}>
        <View>
          <BlankButton text='選個位置' onPress={ this.openSearchModal } /> 
        </View>
        <View style={{marginTop: 20}}> 
          <BlankButton text='現在位置' onPress={ this.current } /> 
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text>{this.SubjectEditStore.address || '請輸入您的所在位置'}</Text>
        </View>
      </View>
    )
  }
}