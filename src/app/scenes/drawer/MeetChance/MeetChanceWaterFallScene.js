import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions } from 'react-native'
import GeoFire from 'geofire'

import Wave from '../../../views/Wave/Wave'
import Cookie from '../../../views/Cookie/Cookie'

const data = [
  {key:1 ,displayName: 'DEDED'},
  {key:2 ,displayName: 'AAA'},
  {key:3 ,displayName: 'CCCCCC'},
]

const { width } = Dimensions.get('window')

const x = 5

const picWidth = (width - 4 * x)/3

const styles = {
  self: {
    alignSelf:'center'  
  }
}

@inject("firebase","SubjectStore") @observer
export default class MeetChanceWaterFallScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      preyLists: new Array
    }
  }

  componentWillMount() {
    this.fetchMeetChance()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  fetchMeetChance = () => {
    const geoFire = new GeoFire(this.firebase.database().ref("/user_locations/"))
    const geoQuery = geoFire.query({
      center: [this.SubjectStore.latitude, this.SubjectStore.longitude],
      radius: 30
    })
    geoQuery.on('ready', () => {
      // 先執行一次
      // 之後每次有其他hook執行完後，再跟著執行
      console.log('ready')
      }
    )

    geoQuery.on("key_entered", function(key, location, distance) {
      console.log(key + " entered query at " + location + " (" + distance + " km from center)")
    })
    //console.log(this.SubjectStore.latitude)
    //console.log(this.SubjectStore.longitude)
    //const query = new GeoFire(this.firebase.database().ref("/user_locations/")).query({
    //  center: [latitude, longitude],
    //  radius: 1000
    //})
/*


    query.on("key_entered", (uid) => {
      if (!(uid === this.SubjectStore.uid)){
        this.state.preyLists.push({key: uid})
      }
    })
    query.on("ready", () => {
      this.state.preyLists.forEach((item) => 
        {
          this.firebase.database().ref('users/' + item.key).once('value').then(
            (snap) => { 
              if (!(snap.val() == null)){
                item.displayName = snap.val().displayName
                item.photoURL = snap.val().photoURL
                item.onPressButton = this.onPressButton
              } 
            }
          ).catch((error) => {
            console.warn(error)
          }) 
        }
      )
    })
*/
  }

  goToAboutMeTab = () => {
    Actions.aboutme({type: 'res'})
  }

  onPressButton = () => {
    //Actions.MeetChanceCourt()
  }

  header = () => (
    <View style={ styles.self }>
      <Cookie size={150} name={this.SubjectStore.displayName} photoURL={this.SubjectStore.photoURL}/>
    </View>
  )

  render() {
    return(
    <View style={{flex:1}}>
      <FlatList
        data={ data } 
        numColumns={3}
        renderItem={({item}) => 
        <Cookie  
          name={item.displayName} 
          photoURL={ item.photoURL }
          onPress={ item.onPressButton } 
        /> } 
        ListHeaderComponent={ this.header }
        getItemLayout={(data, index) => (
          {length: picWidth, offset: picWidth * index, index}
        )}
      />
      <View style={{position: 'absolute', bottom: 0}}>
        <Wave/>
      </View>
    </View>
    )
  }
}

