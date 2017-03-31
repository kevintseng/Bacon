import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text, Button, List, ListItem} from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import GeoFire from 'geofire';
import moment from 'moment';

const { width, height } = Dimensions.get('window'); //eslint-disable-line

@observer
export default class Nearby extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    usersLocation: PropTypes.object,
    latlong: PropTypes.object,
    //initialPosition: PropTypes.number,
    //lastPosition: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      usersLocation: [],
    }
    //this.getLocation();
  }

  componentDidMount(){
    //this.getLocation();
    this.getLocation();
    //geoQuery.cancel();
  }

   componentWillMount() {
    //this.latlong =  this.getLocation();
    //this.usersLocation = 'try it!!';
    //this.getGeo();

    Reactotron.log('Rendering Nearby');
    Actions.refresh({ key: 'drawer', open: false });
  }


  getLocation = async () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.parse(JSON.stringify(position));
        this.latitude = initialPosition.coords.latitude;
        this.longitude = initialPosition.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);
        //this.setState({initialPosition});
        console.log('geoLocation sucess  ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds()  )
        var location = {lat: initialPosition.coords.latitude, long:initialPosition.coords.longitude};
        //console.log(location);
        this.getGeo(initialPosition.coords.latitude,initialPosition.coords.longitude);

      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 0, maximumAge: 1000}
    );

  }

  getGeo = async (latitude, longitude) =>{

    var myUserId = this.fs.auth().currentUser.uid;
    var firebaseRef = this.fs.database().ref('/user_locations/')
    var geoFire = new GeoFire(firebaseRef);

    geoFire.set(myUserId, [latitude, longitude ]).then(function() {
        //console.log("Provided key has been added to GeoFire");
      }, function(error) {
        //console.log("Error: " + error);
      });
      var geoQuery = geoFire.query({
        center: [latitude, longitude],
        radius: 10.5
      });
      var center = geoQuery.center();
      var nearBy = [];
      var UserLocation = {};

      /**/
      geoQuery.on("key_entered", function(key, location, distance) {
        //console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
        //nearBy.push({uid: key, distance: parseFloat(distance.toFixed(2))});
        UserLocation = {
          uid: key,
          distance: parseFloat(distance.toFixed(2))
        };
        nearBy.push(UserLocation);
        console.log('geo ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds());
      },function(error) {
        console.log(error);
      });

      /*
      geoQuery.on("key_entered").then(function(key, location, distance) {
        console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
      }, function(error) {
        console.log("Error: " + error);
      });
      */
      //nearBy.push({uid: key, distance: parseFloat(distance.toFixed(2))});
      //var queryData = JSON.parse(JSON.stringify(nearBy));
      //console.log(JSON.stringify(nearBy));
      //return nearBy;

      this.setState({usersLocation : nearBy})
      console.log('geo ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds());
      //console.log(nearBy.length)
  }


  render() {
    console.log('render ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds());
    console.log(this.state.usersLocation);
    const list = this.state.usersLocation;

    return(
      <View>
      <List containerStyle={{marginBottom: 20}}>
      {
        list.map((l, i) => (
          <ListItem
            roundAvatar
            //avatar={{uri:l.avatar_url}}
            key={i}
            title={l.uid}
          />
        ))
      }
    </List>

      </View>
    );
  }
}
