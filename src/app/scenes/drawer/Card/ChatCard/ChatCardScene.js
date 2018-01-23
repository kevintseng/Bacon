import React, { Component } from 'react'
import { View, Image, Dimensions, BackHandler, ToastAndroid, TouchableOpacity, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import BaconCard from 'react-native-bacon-card'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'
import { sortedAlbum, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../../../../../api/Utils'

const { width, height } = Dimensions.get('window')

const styles = {
  view: {
    flex: 1
  },
  tool : {
    flexDirection: 'row',
    position: 'absolute', 
    justifyContent: 'space-around',
    top: height/2, 
    width
  }
}

@inject('firebase','SubjectStore','ChatStore') @observer
export default class ChatCardScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
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

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  onPressRight = () => {
    const chatRoomKey = this.SubjectStore.uid > this.props.uid ? this.SubjectStore.uid + this.props.uid : this.props.uid + this.SubjectStore.uid
    const title = this.state.nickname + '，' + this.state.age
    this.ChatStore.setChatRoomKey(chatRoomKey,this.props.uid)
    Actions.InitChatRoom({title: title, Title: title, chatRoomKey: chatRoomKey ,preyID: this.props.uid})
  }

  onPressReport = () => {
    alert('已通知官方檢舉訊息')
  }

  onPrssBlockade = () => {
    alert('已封鎖此人')
  }

  render() {
    return(
      <View style={styles.view}> 
      { this.state.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
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
            onPressReport={ this.onPressReport }
            onPrssBlockade={ this.onPrssBlockade }
          />
          <View style={styles.tool}>
            <TouchableOpacity onPress={ this.onPressLeft }>
              <Image source={require('../../../../../images/btn_qy_fav_0.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../../images/btn_qy_chat.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      }    
      </View>
    )
  }
}
