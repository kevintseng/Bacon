import React, { Component } from 'react'
import { View, Image, Dimensions, BackHandler, ToastAndroid, TouchableOpacity, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import BaconCard from 'react-native-bacon-card'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'
import { sortedAlbum, calculateAge, calculateDistance, languagesToString, hobbiesToFlatList } from '../../../../../api/Utils'
import localdb from '../../../../../configs/localdb'

const { width, height } = Dimensions.get('window')

const pxToDp = (uiElementPx) => {
  //PixelRatio.get();
  return uiElementPx*(width/1440)
}

const styles = {
  view: {
    flex: 1
  },
  tool : {
    flexDirection: 'row',
    position: 'absolute', 
    justifyContent: 'space-around',
    top: width - (pxToDp(312)/2), 
    width
  }
}

@inject('firebase','SubjectStore','ChatStore','FateStore') @observer
export default class ChatCardScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.ChatStore = this.props.ChatStore
    this.FateStore = this.props.FateStore
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
    if (this.state.collection === true) {
      // 收集此人 加入local db
      localdb.save({
        key: 'collection' + this.SubjectStore.uid,
        id: this.props.uid,
        data: {
          time: Date.now(),
        },
        expires: null,
      })
    } else {
      // 將此人移出local db
      localdb.remove({
        key: 'collection' + this.SubjectStore.uid,
        id: this.props.uid
      })
      if (this.props.refreshCollect) {
        // 將此人移出收藏清單
        this.FateStore.removeCollectionPrey(this.props.uid)
      }
    }
  }


  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData)
  }

  fetchData = () => {
    // TODO: 改成Promise All
    localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
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
          collection: ids.includes(this.props.uid) ? true : false,
          loading: false
        })
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
    this.firebase.database().ref('hello_chat_rooms_count/' + this.SubjectStore.uid).once('value',snap => {
      const messageSendPeople = snap.val()
      if (messageSendPeople >= 10) {
        Actions.UseBonus({uid: this.props.uid, _type: 'B'})  
      } else {
        this.ChatStore.setChatRoomKey(chatRoomKey,this.props.uid)
        Actions.InitChatRoom({title: title, Title: title, chatRoomKey: chatRoomKey ,preyID: this.props.uid})
      }
    })
  }

  onPressLeft = () => {
    localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
      if ((ids.length >= this.SubjectStore.maxCollectNumber) && !ids.includes(this.props.uid)) {
        alert('已到達您的收藏上限')
      } else {
        this.setState({
          collection: !this.state.collection,
        })
      }
    }).catch(err => console.log(err))
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
          >
            <View style={styles.tool}>
              <TouchableOpacity onPress={ this.onPressLeft }>
                <Image source={this.state.collection ? require('../../../../../images/btn_qy_fav_1.png') : require('../../../../../images/btn_qy_fav_0.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ this.onPressRight }>
                <Image source={require('../../../../../images/btn_qy_chat.png')}/>
              </TouchableOpacity>
            </View>
          </BaconCard>
        </View>
      }    
      </View>
    )
  }
}
