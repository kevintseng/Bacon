import React, { Component } from 'react'
import { View, Dimensions, BackHandler, ToastAndroid, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import BaconCard from 'react-native-bacon-card'
import BaconActivityIndicator from '../../../views/BaconActivityIndicator'
import { sortedAlbum, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../../../../api/Utils'

const styles = {
  view: {
    flex: 1
  }
}

@inject('firebase','SubjectStore') @observer
export default class ChatRoomPreviewScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.setState({
      loading: true
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  fetchData = () => {
    this.firebase.database().ref('users/' + this.props.uid).once('value',snap => {
      const albumObject = sortedAlbum(snap.val().album || new Object,snap.val().avatar)
      const album = Object.keys(albumObject).map(key => albumObject[key] )  
      this.setState({
        nickname: snap.val().nickname,
        bio: snap.val().bio,
        album: album,
        age: calculateAge(snap.val().birthday),
        distance: calculateDistance(snap.val().latitude,snap.val().longitude,this.SubjectStore.latitude,this.SubjectStore.longitude),
        address: snap.val().address,
        langs: languagesToString(snap.val().languages || new Object),
        hobbies: hobbiesToFlatList(snap.val().hobbies || new Object),
        loading: false
      })
    })
  }

  render() {
    return(
      <View style={styles.view}> 
      { this.state.loading ? <BaconActivityIndicator/> :
          <BaconCard
            album={ this.state.album }
            displayName={ this.state.nickname }
            age={ this.state.age }
            bio={ this.state.bio }
            distance={ this.state.distance }
            address={  this.state.address }
            langs={ this.state.langs }
            hobbies={ this.state.hobbies }
            showDistance
            showBlockade
            showReport
          />
      }    
      </View>
    )
  }
}
