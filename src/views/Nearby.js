import React, { Component, PropTypes } from 'react';
import { View, Dimensions,ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text, Button, Avatar} from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import GeoFire from 'geofire';
import moment from 'moment';


const { width, height } = Dimensions.get('window'); //eslint-disable-line
const styles = {
    contentViewStyle: {
        // 主轴方向
        flexDirection:'row',
        // 换行
        flexWrap:'wrap'
    },

    itemStyle: {
        // 对齐方式
        alignItems:'center',
        justifyContent:'center',
        // 尺寸
        width:80,
        height:80,
        // 左边距
        marginLeft:20,
        marginTop:20
    },

    itemImageStyle: {
        // 尺寸
        width:80,
        height:80,
        // 间距
        marginBottom:5
    }
};

const newData = [
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"}
  ];

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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      usersLocation: [],
      dataSource: ds.cloneWithRows([]),
    }

    //this.getLocation();
  }

  componentDidMount(){
    //this.getLocation();
    this.getLocation();
    //geoQuery.cancel();
    //this.getData();
  }

   componentWillMount() {
    //this.latlong =  this.getLocation();
    //this.usersLocation = 'try it!!';

    //this.getGeo();

    Reactotron.log('Rendering Nearby');
    Actions.refresh({ key: 'drawer', open: false });
  }


  getLocation = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.parse(JSON.stringify(position));
        this.latitude = initialPosition.coords.latitude;
        this.longitude = initialPosition.coords.longitude;
        //Reactotron.log(this.latitude);
        //Reactotron.log(this.longitude);
        //this.setState({initialPosition});
        //Reactotron.log('geoLocation sucess  ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds()  )
        var location = {lat: initialPosition.coords.latitude, long:initialPosition.coords.longitude};
        //Reactotron.log(location);
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
        //Reactotron.log("Provided key has been added to GeoFire");
      }, function(error) {
        //Reactotron.log("Error: " + error);
      });
      //Reactotron.log('lat: ' + latitude + ', lon: ' + longitude);
      var geoQuery = geoFire.query({
        center: [latitude, longitude],
        radius: 50
      });
      var center = geoQuery.center();
      var nearBy = [];
      //var UserLocation = {};

      geoQuery.on("ready", async () => {
        await geoQuery.on('key_entered', (key, location, distance) => {
          //Reactotron.log(key + " is located at [" + location + "] which is within the query (" + parseFloat(distance.toFixed(2)) + " km from center)");
          //nearBy.push({uid: key, distance: parseFloat(distance.toFixed(2)) });

          if(key != myUserId){
              nearBy.push({uid: key, distance: parseFloat(distance.toFixed(2)) });
          }
        });
        //Reactotron.log('nearBy');
        //Reactotron.log(nearBy);

        for (var value of nearBy){
          console.log(value);
          //value.name = 'frank';
          await this.fs.database().ref('users/' + value.uid).once('value').then(function(snapshot){
            value.name = snapshot.val().displayName;
            value.photoURL = snapshot.val().photoURL;
          });
          await this.fs.database().ref('connections/' + value.uid).once('value').then(function(snapshot){
            //value.online = snapshot.val().online;
            value.online = snapshot.val().online;
          });
        }
        this.setState({usersLocation : nearBy})
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(nearBy);
        this.setState({dataSource: ds.cloneWithRows(nearBy)})
        //Reactotron.log(error);
      });


      /*
      geoQuery.on("key_entered").then(function(key, location, distance) {
        Reactotron.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
      }, function(error) {
        Reactotron.log("Error: " + error);
      });
      */
      //nearBy.push({uid: key, distance: parseFloat(distance.toFixed(2))});
      //var queryData = JSON.parse(JSON.stringify(nearBy));
      //Reactotron.log(JSON.stringify(nearBy));
      //return nearBy;
  }


  getData = () =>{
    var uid = 'r5WSncaNXATxjvXqbsjwOBAnSZB2';
    this.fs.database().ref('users/' + uid).once('value').then(function(snapshot){
      var username = snapshot.val().username;
      console.log(snapshot.val());
    })
  }






  render() {
    //Reactotron.log('render ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds());
    //Reactotron.log(this.state.usersLocation);
    //const list = this.state.usersLocation;
    //console.log(this.state.usersLocation);
    const list = this.state.usersLocation;
    const styles = {
        contentViewStyle: {
            // 主轴方向
            flexDirection:'row',
            // 换行
            flexWrap:'wrap'
        },

        itemStyle: {
            // 对齐方式
            alignItems:'center',
            justifyContent:'center',
            // 尺寸
            width:80,
            height:80,
            // 左边距
            marginLeft:40,
            marginTop:20
        },

        itemImageStyle: {
            // 尺寸
            width:80,
            height:80,
            // 间距
            marginBottom:5
        }
    };

    return(
      <View>
        <View style={{ height: 90, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
        </View>



          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              contentContainerStyle={styles.contentViewStyle}
          />
      </View>
    );
  };

  renderRow(rowData){
            return(
            <View style={styles.itemStyle}>
                <Image source={{uri:rowData.photoURL}} style={styles.itemImageStyle}/>
                <Text>{rowData.name}</Text>
            </View>
            );
  }

}
