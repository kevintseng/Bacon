import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"
import { observer, inject } from "mobx-react/native"
import { Actions } from "react-native-router-flux"
// views
import MeetChanceAll from "../../views/MeetChance/MeetChanceAll"

//const { width, height } = Dimensions.get('window')

@inject("SubjectStore","ObjectStore") @observer
export default class MeetChanceAllContainer extends Component {
  //static propTypes = {
    //store: PropTypes.object,
    //fire: PropTypes.object,
    //latitude: PropTypes.number,
    //longitude: PropTypes.number,
    //usersLocation: PropTypes.object,
    //latlong: PropTypes.object,
    //myPhotoUrl: PropTypes.string,
   // myDisplayName: PropTypes.string,
    //initialPosition: PropTypes.number,
    //lastPosition: PropTypes.number,
  //}

  constructor(props) {
    super(props);
    this.SubjectStore = props.SubjectStore
    this.ObjectStore = props.ObjectStore
  }

  componentWillMount() {
    //console.log('Rendering Nearby');
    Actions.refresh({ key: 'drawer', open: false })
    this.ObjectStore.initPreyList()
    // this.getLocation();
  }

  componentDidMount(){
    this.ObjectStore.fetchPreyListsByMeetChance(this.SubjectStore.user.geocode.lat, this.SubjectStore.user.geocode.lng)
    //console.warn('componentDidMount')
    //this.getGeo(25.001542,121.497097);
  }
/*
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
*/


  //getGeo = async (latitude, longitude) =>{

    //const myUserId = this.fs.auth().currentUser.uid;
    //const firebaseRef = this.fs.database().ref('/user_locations/')
    //const geoFire = new GeoFire(firebaseRef);

    /**/
    //geoFire.set(myUserId, [latitude, longitude ]).then(() => {
        //console.log("Provided key has been added to GeoFire");
    //  }, (error) => {
    //    console.log("Error: " + error);
    //  });

      //const geoQuery = geoFire.query({
      //  center: [latitude, longitude],
      //  radius: 500
      //});
      //const center = geoQuery.center();
      //var nearBy = [];
      //console.warn(center)

      //geoQuery.on("key_entered", (key, location, distance) => {
      //  nearBy.push(key)
      //});

      //geoQuery.on("ready", (key, location, distance) => {
        //console.warn("完成")
      //})
      //console.warn(nearBy)
      //geoQuery.on("ready", () => {
      //  geoQuery.on('key_entered', (key, location, distance) => {
          //if(key != myUserId){
      //      nearBy.push(key)
            //this.getUsers(nearBy, key, distance);
          //}
      //  });
      //  console.warn(nearBy)
      //});
  //}


/*
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

*/

  render() {

    const { ObjectStore } = this.props
    
    const indicator = (
      <ActivityIndicator
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          marginTop: 150
        }}
        size="large"
      />
    )

    return(
      <View style={{flex: 1}}>
      { ObjectStore.loading && indicator }
      {
        ObjectStore.preyList && !ObjectStore.loading && 
        <MeetChanceAll/>
      }
      </View>
    );
  }
}

/*
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
*/
