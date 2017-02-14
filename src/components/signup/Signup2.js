import React, {Component, PropTypes} from 'react'; // eslint-disable-line
import {
  View,
  Dimensions,
  Text,
} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';  // eslint-disable-line
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; // eslint-disable-line
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import { Header } from '../common/Header';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

export class Signup2 extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      size: {
        width,
        height:600,
      },
      placeholder: '請輸入所在城市名稱',
      dispLocationName: '',
      errMsg: false,
      disabled: true,
      loading: false,
    };
  }

  updatePlace = (data, details) => {
    const disp = data.description;
    const addr = data.address_components;
    const placeID = data.place_id;
    const geocode= data.geometry.location;
    this.props.store.setCity(addr[0].long_name);
    this.props.store.setCountry(addr[addr.length-1].short_name);
    this.props.store.setPlaceID(placeID);
    this.props.store.setGeocode(geocode);
    this.setState({
      placeholder: disp,
      dispLocationName: disp,
      errMsg: false,
      disabled: false,
    });
  }

  goNext = () => {
    if(this.state.dispLocationName == '') {
      alert('請輸入您所在的城市');
    } else {
      Actions.signup3({
        store: this.props.store
      });
    }
  }

  render() {
    const { size, placeholder, dispLocationName } = this.state;
    return (
      <View style={size}>
        <Header
          headerText='常在城市'
          rightButtonText='下一步'
          onRight={this.goNext}
          rightColor='#007AFF'
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          minLength={2}
          autoFocus={false}
          listViewDisplayed={true}
          fetchDetails={false}
          onPress={(data, details = null) => {
            Reactotron.log({data: data, detail: details});
            this.updatePlace(data, details);
          }}
          getDefaultValue={() => dispLocationName}
          query={{
            key: 'AIzaSyBYTZDmeWcR9MEdiUTdgZGb80nDWYLnCSk',
            language: 'en', // language of the results
            types: 'geocode', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={true}
          currentLocationLabel="現在所在位置城市"
          nearbyPlacesAPI='GoogleReverseGeocoding'
          filterReverseGeocodingByTypes={['administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3']}
          predefinedPlacesAlwaysVisible={true}
        />
      </View>
    );
  }
}

// const addr = data.address_components;
// const city = addr[0].long_name;
// const placeID = data.place_id;
// const geocode= data.geometry.location;
// this.props.store.setCity(addr[0].long_name);
// this.props.store.setCountry(addr[addr.length-1].short_name);
// this.props.store.setPlaceID(placeID);
// this.props.store.setGeocode(geocode);
// this.setState({
//   placeholder: city,
//   dispLocationName: city,
//   errMsg: false,
//   disabled: false,
// });
