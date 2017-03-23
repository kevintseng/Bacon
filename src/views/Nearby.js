import React, { Component, PropTypes } from 'react';
import { View, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text, Button } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import GeoFire from 'geofire';

const { width, height } = Dimensions.get('window'); //eslint-disable-line

@observer
export default class Nearby extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height
      },
      tip: null,
    };
  }

  componentWillMount() {
    Reactotron.log('Rendering Nearby');
    Actions.refresh({ key: 'drawer', open: false });
  }


  getLocation = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //console.log('pos', position); stringify
        var initialPosition = JSON.parse(JSON.stringify(position));
        console.log(initialPosition);
        console.log(initialPosition.coords.latitude);
        this.latitude = initialPosition.coords.latitude;
        this.longitude = initialPosition.coords.longitude;
        //console.log(initialPosition);
        //console.log(initialPosition['coords']['longitude']);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  getMyuid = () => {
    var myUserId = this.fs.auth().currentUser.uid;
    console.log(myUserId);
    this.fs.database().ref('/users/').once('value').then(function(snapshot) {
      var username = snapshot.val().email;
      console.log(snapshot.val());
    });

  }

  getGeo = () =>{
    var myUserId = this.fs.auth().currentUser.uid;
    var firebaseRef = this.fs.database().ref('/user_locations/')
    var geoFire = new GeoFire(firebaseRef);

    //console.log(this.latitude);

    geoFire.set(myUserId, [this.latitude, this.longitude ]).then(function() {
        console.log("Provided key has been added to GeoFire");
      }, function(error) {
        console.log("Error: " + error);
      });

      var geoQuery = geoFire.query({
        center: [this.latitude, this.longitude ],
        radius: 10.5
      });

      var center = geoQuery.center();

      geoQuery.on("key_entered", function(key, location, distance) {
        console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
      });
  }

  render() {
    //this.getLocation();
    return(
      <View>
      <Button
        backgroundColor='#007AFF'
        //color='#007AFF'
        buttonStyle={{marginTop: 20}}
        onPress={this.getLocation}
        title='送出' />

        <Button
          backgroundColor='#007AFF'
          //color='#007AFF'
          buttonStyle={{marginTop: 20}}
          onPress={this.getMyuid}
          title='送出' />

          <Button
            backgroundColor='#007AFF'
            //color='#007AFF'
            buttonStyle={{marginTop: 20}}
            onPress={this.getGeo}
            title='送出' />

      </View>
    );
  }
}
