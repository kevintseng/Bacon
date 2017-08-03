import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places';

@inject("SignUpInStore") @observer
export default class CityChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
    console.log(place);
    this.SignUpInStore.setGoogleCity(place.address)
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  current = () => {
    RNGooglePlaces.getCurrentPlace()
    .then((results) => {
      this.SignUpInStore.setGoogleCity(results[0].address)
      console.log(results)
    }
      )
    .catch((error) => console.log(error));    
  }

  render() {
    return(
      <View>
        <View>
          <Button
            title='選個位置'
            onPress={ this.openSearchModal }
          />  
        </View>    

        <View style={{marginTop: 20}}>
          <Button
            title='現在位置'
            onPress={ this.current }
          />
        </View> 

        <View style={{marginTop: 20}}>
          <Text>{this.SignUpInStore.city}</Text>
        </View>
      </View>
    )
  }
}