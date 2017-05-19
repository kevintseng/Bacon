import React, { Component, PropTypes } from 'react';
import { View, Dimensions,ListView, Image, TouchableHighlight,  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text, Button, Avatar} from 'react-native-elements';

import GeoFire from 'geofire';
import { MeetChance } from './MeetChanceContainer/MeetChance'
//import moment from 'moment';


const { width, height } = Dimensions.get('window'); //eslint-disable-line
const styles = {
    contentViewStyle: {
        // 主轴方向
        //flexDirection:'row',
        // 换行
        //flexWrap:'wrap'
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    itemStyle: {
        // 对齐方式
        alignItems:'center',
        justifyContent:'center',
        // 尺寸
        width:80,
        height:80,
        // 左边距
        //marginLeft:20,
        marginTop:20,
        margin: 10,
    },

    itemImageStyle: {
        // 尺寸
        width:80,
        height:80,
        // 间距
        marginBottom:5,
        borderRadius: 80/2,
    },

    online:{
      position: 'absolute',
      bottom: 15,
      right: 1,
      height: 15,
      width: 15,
      backgroundColor: '#46ec2c',
      //backgroundColor: '#e5e5e5',
      borderRadius: 15/2,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderWidth: 2
    },

    offline:{
      position: 'absolute',
      bottom: 15,
      right: 1,
      height: 15,
      width: 15,
      //backgroundColor: '#46ec2c',
      backgroundColor: '#e5e5e5',
      borderRadius: 15/2,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderWidth: 2
    }
};


@observer
export default class MeetChanceContainer extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    usersLocation: PropTypes.object,
    latlong: PropTypes.object,
    myPhotoUrl: PropTypes.string,
    myDisplayName: PropTypes.string,
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
      myAccount:{
        url:'',
        name:''
      }
    }
  }

  componentWillMount() {
    console.log('Rendering Nearby');
    Actions.refresh({ key: 'drawer', open: false });
    // this.getLocation();
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation = async() =>{

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.parse(JSON.stringify(position));
        this.latitude = initialPosition.coords.latitude;
        this.longitude = initialPosition.coords.longitude;
//         console.log(this.latitude);
//         console.log(this.longitude);
        //this.setState({initialPosition});
//         console.log('geoLocation sucess  ' + new Date().getSeconds() + ':' +  new Date().getMilliseconds()  )
        const location = {lat: initialPosition.coords.latitude, long:initialPosition.coords.longitude};
        //console.log(location);
        this.getGeo(initialPosition.coords.latitude,initialPosition.coords.longitude);
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  }



  getGeo = async (latitude, longitude) =>{

    var myUserId = this.fs.auth().currentUser.uid;
    var firebaseRef = this.fs.database().ref('/user_locations/')
    var geoFire = new GeoFire(firebaseRef);

    /**/
    geoFire.set(myUserId, [latitude, longitude ]).then(function() {
        //console.log("Provided key has been added to GeoFire");
      }, function(error) {
        //console.log("Error: " + error);
      });

      var geoQuery = geoFire.query({
        center: [latitude, longitude],
        radius: 50
      });
      var center = geoQuery.center();
      var nearBy = [];

      geoQuery.on("ready", async () => {
        await geoQuery.on('key_entered', (key, location, distance) => {
          if(key != myUserId){
            this.getUsers(nearBy, key, distance);
          }
        });
      });
  }




  getUsers = async (nearBy, key, distance) => {
     await this.fs.database().ref('users/' + key).once('value').then(snapshot =>{
       this.getOnlineState(nearBy, key, distance, snapshot.val().displayName, snapshot.val().photoURL);
    }).catch(function(reason){
      console.log(reason);
    });
  };

  getOnlineState = async(nearBy, key , distance, displayName, photoURL) => {
    await this.fs.database().ref('online/' + key).once('value').then(snapshot =>{
      if(snapshot.val() != null){
        nearBy.push({
           uid: key,
           distance: parseFloat(distance.toFixed(2)),
           name:displayName,
           photoURL:photoURL,
           online:true
         });
      }else{
        nearBy.push({
           uid: key,
           distance: parseFloat(distance.toFixed(2)),
           name:displayName,
           photoURL:photoURL,
           online:false
         });
      }
   }).catch(function(reason){
     console.log(reason);
   });
   nearBy.sort(function(a, b) {return a.distance - b.distance;});
     this.setState({usersLocation : nearBy})
     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     console.log(nearBy);
     this.setState({dataSource: ds.cloneWithRows(nearBy)})
  }






  render() {
    const list = this.state.usersLocation;
    console.log()
    return(
      <MeetChance/>
    );
  };

  renderRow = (rowData) => {

    const online = rowData.online;
    let onlineState = (
      <View style={styles.online}></View>
    )

    if(online){
      onlineState = (
        <View style={styles.online}></View>
      )
    }else{
      onlineState = (
        <View style={styles.offline}></View>
      )
    }

    return(
      <TouchableHighlight onPress={() => console.log(rowData.uid)} underlayColor = 'white' style={{height:80, marginTop:30}}>
      <View style={styles.itemStyle}>
          <Image source={{uri:'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/14523254_10205912479689697_9039309889239665813_n.jpg?oh=d5c8c264afd125e35eafd4627cac6cca&oe=597CD498'}} style={styles.itemImageStyle}/>
          {onlineState}
          <Text>{'rowData.name'}</Text>
      </View>
      </TouchableHighlight>
    );
  }





}
