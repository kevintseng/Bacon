import React from 'react'
import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { observer, inject } from 'mobx-react/native'

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

const Location = inject("UIStore")(observer(({ UIStore }) => {

  return (
    <View style = { styles.Location } >
      <GooglePlacesAutocomplete
        styles = { styles.googlePlacesAutocomplete }
        placeholder = {UIStore.city.description}
        minLength = { 1 }
        autoFocus
        listViewDisplayed
        fetchDetails
        onPress = { (data) => {UIStore.setCity(data)} }
        getDefaultValue = { () => "" }
        query = {   
          {
            key: 'AIzaSyBYTZDmeWcR9MEdiUTdgZGb80nDWYLnCSk',
            language: 'en', // language of the results
            types: 'geocode', // default: 'geocode'
          }
        }
        currentLocation
        currentLocationLabel = "現在所在位置城市"
        nearbyPlacesAPI = 'GoogleReverseGeocoding'
        filterReverseGeocodingByTypes = { ['administrative_area_level_2','administrative_area_level_3'] }
        predefinedPlacesAlwaysVisible
      />
    </View>
  )
}))

export default Location