import React, {Component, PropTypes} from 'react'; // eslint-disable-line
import {
  View,
  Dimensions,
} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';  // eslint-disable-line
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; // eslint-disable-line
// import { autorun } from 'mobx';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import { Header } from '../../components/Header';
import { observer } from 'mobx-react/native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

@observer
export class Signup2 extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.object,
    sustore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.fs = this.props.fire;
    this.sustore = this.props.sustore;
    this.state = {
      size: {
        width,
        height:600,
      },
      city: null,
      placeID: null,
      geocode: null,
      placeholder: '請輸入所在城市名稱',
      dispLocationName: '',
      errMsg: false,
      disabled: true,
      loading: false,
    };
  }

  updatePlace = (data, details) => {
    const disp = data.description ? data.description : data.formatted_address;
    const placeID = details.place_id;
    const geocode= details.geometry.location;
    this.setState({
      city: disp,
      placeID: placeID,
      geocode: geocode,
      placeholder: disp,
      dispLocationName: disp,
      errMsg: false,
      disabled: false,
    });
  }

  goNext = () => {
    if(this.state.dispLocationName == '') {
      alert('請提供所在的城市');
    } else {
      this.sustore.setCity(this.state.city);
      this.sustore.setPlaceID(this.state.placeID);
      this.sustore.setGeocode(this.state.geocode);

      Actions.signup3({
        sustore: this.sustore
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
          autoFocus={true}
          listViewDisplayed={true}
          fetchDetails={true}
          onPress={(data, details = null) => {
            Reactotron.log({data, details});
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
          filterReverseGeocodingByTypes={['administrative_area_level_2', 'administrative_area_level_3']}
          predefinedPlacesAlwaysVisible={true}
        />
      </View>
    );
  }
}