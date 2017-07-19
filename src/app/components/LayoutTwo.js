import React from 'react'
import { View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Theme from './Theme'

const LayoutTwo = ({ bottonText,buttonOnPress,returnOnPress,googleOnPress, getDefaultValue,placeholder }) => {
  return(
    <Theme bottonText={ bottonText } buttonOnPress={ buttonOnPress } returnOnPress={ returnOnPress }>
      <View style={{height: 200, marginLeft: 20, marginRight: 20}}>
        <GooglePlacesAutocomplete
          placeholder={ placeholder }
          minLength={2}
          autoFocus
          listViewDisplayed
          fetchDetails
          onPress={ googleOnPress }
          getDefaultValue={ getDefaultValue }
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
            marginLeft: 92
            },
          }}
          currentLocation
          currentLocationLabel="現在所在位置城市"
          nearbyPlacesAPI='GoogleReverseGeocoding'
          filterReverseGeocodingByTypes={['administrative_area_level_2', 'administrative_area_level_3']}
          predefinedPlacesAlwaysVisible
        />
      </View>
    </Theme>
  )
}

export default LayoutTwo