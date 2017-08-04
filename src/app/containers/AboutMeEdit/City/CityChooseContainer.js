import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import RNGooglePlaces from 'react-native-google-places';

@inject('SubjectEditStore') @observer
export default class CityChooseContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
  }

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
    console.log(place);
    this.SubjectEditStore.setAddress(place.address)
    // place represents user's selection from the
    // suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  current = () => {
    RNGooglePlaces.getCurrentPlace()
    .then((results) => {
      this.SubjectEditStore.setAddress(results[0].address)
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
          <Text>{this.SubjectEditStore.address}</Text>
        </View>
      </View>
    )
  }
}