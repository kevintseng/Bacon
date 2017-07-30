import React from 'react'
import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const styles = {
  googleView:{
    //position: 'absolute', 
    //top: 120,
    marginLeft: 20, 
    marginRight: 20, 
  }
}

const CityChoose = ({googleOnPress, getDefaultValue, placeholder, value, onChangeText}) => {
  return(
      <View style={ styles.googleView }>
        <GooglePlacesAutocomplete
          placeholder={ placeholder}
          minLength={1}
          autoFocus={false}
          listViewDisplayed
          onPress={ googleOnPress }
          getDefaultValue={ getDefaultValue }
          textInputProps={{ userProps: {autoCorrect : false},
            onChangeText
          }}
          query={{
            key: 'AIzaSyBYTZDmeWcR9MEdiUTdgZGb80nDWYLnCSk',
            language: 'en', // language of the results
            types: 'geocode', // default: 'geocode'
          }}
          value={ value }
          styles={{
            textInputContainer: {
            backgroundColor: 'white',
            borderBottomColor: 'black',
            borderTopWidth: 0
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: 'black',
            marginLeft: 92
            },
          listView:{
            maxHeight: 180
          }
          }}
          currentLocation
          currentLocationLabel="現在所在位置城市"
          nearbyPlacesAPI='GoogleReverseGeocoding'
          filterReverseGeocodingByTypes = {['locality', 'administrative_area_level_3']}
        />
      </View>
  )
}

export default CityChoose