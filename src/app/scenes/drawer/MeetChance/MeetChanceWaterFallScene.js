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

@inject('firebase','SubjectStore') @observer
export default class MeetChanceWaterFallScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      preyLists: []
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
      radius: 3000
    })

    geoQuery.on("key_entered", (uid, location, distance) => {
      this.firebase.database().ref('users/' + uid).on('value',snap => { 
        if (snap.val()){
          const joined = this.state.preyLists.concat({
            key: uid,
            displayName: snap.val().displayName,
            photoURL: snap.val().photoURL,
            distance: distance
          }).sort((a, b) => {
            return a.distance > b.distance ? 1 : -1;
          })
          this.setState({ preyLists: joined })
        }
      },err => { console.log(err)})
    })

    geoQuery.on("key_moved", (uid, location, distance) => {
      this.firebase.database().ref('users/' + uid).once('value').then(
        snap => { 
          //this.state.preyLists.find(ele => ele.key == uid).distance = distance
          //this.setState({ preyLists: joined })
        }
      )
    })


    geoQuery.on("key_exited", (uid, location, distance) => {
      this.firebase.database().ref('users/' + uid).off().then(() => {
          const removed = this.state.preyLists.filter(ele => !(ele.key == uid)).sort((a, b) => {
            return a.distance > b.distance ? 1 : -1
          })
          this.setState({ preyLists: removed })
        }
      ).catch( err => {
        console.log(err)
      })
    })

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
        data={ this.state.preyLists } 
        numColumns={1}
        renderItem={({item}) => 
        <Cookie  
          name={ item.distance } 
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

