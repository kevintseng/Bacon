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

const {width, height} = Dimensions.get('window'); //eslint-disable-line

export default class Signup2 extends Component {
  // static propTypes = {
  //   email: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  //   birthday: PropTypes.string.isRequired,
  //   nickname: PropTypes.string.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      size: {
        width,
        height:500,
      },
      dispLocationName: '請輸入所在城市名稱',
      engLocationName: '',
      errMsg: false,
      disabled: true,
      loading: false,
    };
  }

  updatePlace = (data, details) => {
    const disp = data.formatted_address;
    const eng = details.formatted_address;
    this.setState({
      dispLocationName: disp,
      engLocationName: eng,
      errMsg: false,
      disabled: false,
    });
  }

  // checkInputs = () => {
  //   let tmp = this.state.nickname.trim();
  //   if(tmp.length == 0) {
  //     this.setState({
  //       errMsg: '請輸入您想要使用的的名稱',
  //       disabled: true,
  //     })
  //   } else {
  //     Actions.signup3({
  //       email: this.props.email,
  //       password: this.props.password,
  //       nickname: this.props.nickname,
  //       birthday: this.props.birthday,
  //       city: this.state.city,
  //     });
  //   }
  // }

  render() {
    return (
      <View style={this.state.size}>
        <View style={[this.state.size, { marginBottom: 20, marginTop: 8}]}>
          {
            // <Text>{this.props.email}</Text>
            // <Text>{this.props.password}</Text>
            // <Text>{this.props.birthday}</Text>
            // <Text>{this.props.nickname}</Text>
          }
          <Text>{this.state.engLocationName}</Text>
          <GooglePlacesAutocomplete
            placeholder={this.state.dispLocationName}
            minLength={2}
            autoFocus={false}
            listViewDisplayed={true}
            fetchDetails={true}
            onPress={(data, details= null) => {
              this.updatePlace(data, details);
              Reactotron.log({data: data});
              Reactotron.log({detail: details});
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
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
            currentLocationLabel="以現在位置搜尋城市"
            nearbyPlacesAPI='GoogleReverseGeocoding'
            filterReverseGeocodingByTypes={['administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3']}
            predefinedPlacesAlwaysVisible={true}
          />
        </View>
      </View>
    );
  }
}
