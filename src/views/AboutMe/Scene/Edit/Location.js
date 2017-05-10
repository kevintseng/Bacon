import React, { Component } from 'react'
import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const styles = {
  Location: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  googlePlacesAutocomplete: {
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    }
  }
}

//const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
//const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class Location extends Component {
  render() {
    return (
      <View style = { styles.Location } >
        <GooglePlacesAutocomplete
          styles = { styles.googlePlacesAutocomplete }
          placeholder = "請輸入所在城市名稱"
          minLength = { 2 }
          autoFocus = { true }
          listViewDisplayed = { true }
          fetchDetails = { true }
          onPress = { 
            (data, details = null) => {
              //console.log({data, details});
              this.updatePlace(data, details);
            } 
          }
          getDefaultValue = { () => ""}
          query = { 
            {
              key: 'AIzaSyBYTZDmeWcR9MEdiUTdgZGb80nDWYLnCSk',
              language: 'en', // language of the results
              types: 'geocode', // default: 'geocode'
            }
          }
          currentLocation = { true }
          currentLocationLabel = "現在所在位置城市"
          nearbyPlacesAPI = 'GoogleReverseGeocoding'
          filterReverseGeocodingByTypes = { ['administrative_area_level_2','administrative_area_level_3'] }
          predefinedPlacesAlwaysVisible = { true }
        />
      </View>
    )
  }
}

export default Location;