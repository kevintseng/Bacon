import React, { Component } from 'react'
import { View, Image, Dimensions, BackHandler, ToastAndroid, TouchableOpacity, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import BaconCard from 'react-native-bacon-card'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'
import BaconMatch from '../../../../views/BaconMatch'
import { sortedAlbum, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../../../../../api/Utils'

//import MateModalContainer from './containers/MateModalContainer'

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

@inject('firebase','SubjectStore','ChatStore','FateStore') @observer
export default class MatchCardScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.FateStore = this.props.FateStore
    this.state = {
      loading: true,
      visible: false
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.setState({
      loading: true,
      visible: false
    })
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
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

  onPressReport = () => {
    alert('已通知官方檢舉訊息')
  }

  onPrssBlockade = () => {
    alert('已封鎖此人')
  }

  onPressRight = () => {
    // 上傳goodImpression
    this.firebase.database().ref('goodImpressionList/' + this.SubjectStore.uid + this.props.uid).set({wooner: this.SubjectStore.uid, prey: this.props.uid, time: Date.now()}) 
    // 上傳配對聊天室資料
    const chatRoomKey = this.SubjectStore.uid > this.props.uid ? this.SubjectStore.uid + this.props.uid : this.props.uid + this.SubjectStore.uid
    this.firebase.database().ref('nonHandleChatRooms/' + chatRoomKey).remove()
    this.firebase.database().ref('matchChatRooms/' + chatRoomKey).once('value',snap => {
      if (snap.val()) {
        //console.warn('已有聊天室紀錄')
      } else {
        this.firebase.database().ref('matchChatRooms/' + chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          chatRoomRecipient: this.props.uid
        })
      }      
    })
    this.firebase.database().ref('chat_rooms/' + chatRoomKey).once('value',snap => {
      if (snap.val()) {
        this.firebase.database().ref('chat_rooms/' + chatRoomKey + '/interested').set(2)
      } else {
        this.firebase.database().ref('chat_rooms/' + chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
          chatRoomRecipient: this.props.uid,
          interested: 2
        })
      }
    })

    this.firebase.database().ref('chats/' + chatRoomKey).once('value',snap => {
      if (snap.val()) {
        //
      } else {
        this.firebase.database().ref('chats/' + chatRoomKey).set({
          chatRoomCreater: this.SubjectStore.uid,
        })
      }
    })

    this.FateStore.removeGoodImpressionsPrey(this.props.uid)
    this.setState({
      visible: true
    })
  }

  onPressLeft = () => {
    this.firebase.database().ref('goodImpressionList/' + this.props.uid + this.SubjectStore.uid).remove()
    this.FateStore.removeGoodImpressionsPrey(this.props.uid)
    Actions.FateTab({type: 'reset'})
    // 沒配對
  }

  onPressReturn = () => {
    this.setState({
      visible: false
    })    
  }

  onPressMatchLeft = () => {
    this.setState({
      visible: false
    }) 
    Actions.FateTab({type: 'reset'})
  }

  onPressMatchRight = () => {
    this.setState({
      visible: false
    }) 
    const chatRoomKey = this.SubjectStore.uid > this.props.uid ? this.SubjectStore.uid + this.props.uid : this.props.uid + this.SubjectStore.uid
    const title = this.state.nickname + '，' + this.state.age
    this.ChatStore.setChatRoomKey(chatRoomKey,this.props.uid)
    this.ChatStore.setGoToChatTab(true)
    Actions.ChatTab({type: 'reset'})
    //Actions.MatchChatRoom({type: 'reset',title: title, chatRoomKey: chatRoomKey ,preyID: this.props.uid, renderBackButton: this.goToChatTab})
  }

  //goToChatTab = () => {
  //  Actions.ChatTab({type: 'reset'})
  //}


  render() {
    return(
      <View style={styles.view}> 
      { this.state.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
          <BaconMatch
            visible={this.state.visible}
            onPressReturn={this.onPressReturn}
            onPressRight={this.onPressMatchRight}
            onPressLeft={this.onPressMatchLeft}
            leftText={'     回到緣分'}
          />
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
              <Image source={require('../../../../../images/btn_meet_dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../../images/btn_meet_like.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      }    
      </View>
    )
  }
}