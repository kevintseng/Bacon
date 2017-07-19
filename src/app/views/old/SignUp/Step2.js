import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
//import { inject } from "mobx-react"

export default class Step2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: null,
      //placeID: null,
      //geocode: null,
      placeholder: '請輸入所在城市名稱',
      dispLocationName: ''
    };
  }

  updatePlace = data => {
    const disp = data.description ? data.description : data.formatted_address;
    //const placeID = details.place_id;
    //const geocode= details.geometry.location;
    this.setState({
      city: disp,
      //placeID: placeID,
      //geocode: geocode,
      placeholder: disp,
      dispLocationName: disp,
    });
  }


  onPressNextButton = () => {
    Actions.Step3()
  }

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 20}}>

        <View>
          <Image source={require('../../../images/ico_titlebar_logo.png')} />
        </View>

        <View style={{height: 200, marginLeft: 20, marginRight: 20}}>
          <GooglePlacesAutocomplete
              placeholder={this.state.eholder}
              minLength={2}
              autoFocus
              listViewDisplayed
              fetchDetails
              onPress={ data => {this.updatePlace(data)}}
              getDefaultValue={() => this.state.dispLocationName}
              query={{
                key: 'AIzaSyBYTZDmeWcR9MEdiUTdgZGb80nDWYLnCSk',
                language: 'en', // language of the results
                types: 'geocode', // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'white',
                  borderBottomColor: 'black',
                  borderTopWidth: 0
                },
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: 'black',
                  marginLeft: 80
                },
              }}
              currentLocation
              currentLocationLabel="現在所在位置城市"
              nearbyPlacesAPI='GoogleReverseGeocoding'
              filterReverseGeocodingByTypes={['administrative_area_level_2', 'administrative_area_level_3']}
              predefinedPlacesAlwaysVisible
            />
        </View>

        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={this.onPressNextButton}> 
            <Image style={{justifyContent: 'center'}} source={require('../../../images/btn_gredient.png')}>
              <Text style={{fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>下一步</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View>
          <Image source={require('../../../images/pic_index_wave.png')} />
        </View>
      </View>
    )
  }
}
 
