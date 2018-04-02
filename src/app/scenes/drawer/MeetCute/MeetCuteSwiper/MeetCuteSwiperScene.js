import React, { Component } from 'react'
import { View, Dimensions, InteractionManager, Image,TouchableOpacity, TouchableWithoutFeedback, Modal, Text, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import BaconCard from 'react-native-bacon-card'
import Swiper from 'react-native-deck-swiper'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import localdb from '../../../../../configs/localdb'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'
import Loading from '../../../../views/Loading/Loading'
import BaconCheckMatchContainer from './containers/BaconCheckMatchContainer'
import BaconMatchContainer from './containers/BaconMatchContainer'
import BaconGoToChatRoomContainer from './containers/BaconGoToChatRoomContainer'

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

@inject('firebase','SubjectStore','MeetCuteStore','ChatStore','ControlStore') @observer
export default class MeetCuteSwiperScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.ChatStore = this.props.ChatStore
    this.ControlStore = this.props.ControlStore
    this.cardIndex = 0
  }

  componentWillMount() {
    this.MeetCuteStore.startLoading()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.MeetCuteStore.fetchPreys(this.SubjectStore.uid,this.SubjectStore.preySexualOrientation)
    })
  }

  onSwipedAll = () => {
    this.MeetCuteStore.noHavepreys()
    //this.MeetCuteStore.startLoading()
    //this.cardIndex = 0
    //this.MeetCuteStore.fetchPreys(this.SubjectStore.preySexualOrientation)
  }

  onPressLeft = () => {
    this.swiper.swipeLeft()
  }

  onPressRight = () => {
    // TODO: 緩存
    this.MeetCuteStore.startCheckMatch()
    this.updateGoodImpression()
    this.firebase.database().ref('goodImpressionList/' + this.MeetCuteStore.preys[this.cardIndex].key + this.SubjectStore.uid).once('value',async snap => {
      if (snap.val()) {
        this._uid = this.MeetCuteStore.preys[this.cardIndex].key
        this.chatRoomKey = this.SubjectStore.uid > this._uid ? this.SubjectStore.uid + this._uid : this._uid + this.SubjectStore.uid
        this.firebase.database().ref('chat_rooms/' + this.chatRoomKey +'/interested').once('value',async snap => {
          if (snap.val() || snap.val() === 0 ) {
            if (snap.val() === 2) {
              //
            } else if (snap.val() === 1) {
              await this.firebase.database().ref('nonHandleChatRooms/' + this.chatRoomKey).once('value',snap => {
                if (snap.val()) {
                  this.firebase.database().ref('matchChatRooms/' + this.chatRoomKey).set(snap.val())
                }
              })
              await this.firebase.database().ref('nonHandleChatRooms').child(this.chatRoomKey).remove()
              await this.firebase.database().ref('chat_rooms/' + this.chatRoomKey +'/interested').set(2)
            } else {
              await this.firebase.database().ref('nonMatchChatRooms/' + this.chatRoomKey).once('value',snap => {
                if (snap.val()) {
                  this.firebase.database().ref('matchChatRooms/' + this.chatRoomKey).set(snap.val())
                }
              })
              await this.firebase.database().ref('nonMatchChatRooms').child(this.chatRoomKey).remove()
              await this.firebase.database().ref('chat_rooms/' + this.chatRoomKey +'/interested').set(2)
            }
          } else {
              await this.firebase.database().ref('chat_rooms/' + this.chatRoomKey).set({
                chatRoomCreater: this.SubjectStore.uid,
                interested: 2, //未處理
                chatRoomRecipient: this._uid,
              })
              await this.firebase.database().ref('matchChatRooms/' + this.chatRoomKey).set({
                chatRoomCreater: this.SubjectStore.uid,
                chatRoomRecipient: this._uid 
              })
          }
          this.MeetCuteStore.finishCheckMatchAndSetMatch()
        })
      } else {
        await this.sleep(500)
        this.MeetCuteStore.finishCheckMatch()
        this.swiper.swipeRight()
      }
    })
  }

  onPressReport = () => {
      Alert.alert( 
        '管理員提示', '已通知官方檢舉訊息', [ 
        {text: '確認', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } 
      )
  }

  onPrssBlockade = () => {
      localdb.remove({
        key: 'collection' + this.SubjectStore.uid,
        id: this.MeetCuteStore.preys[this.cardIndex].key
      })
      localdb.save({
        key: 'blockade' + this.SubjectStore.uid,
        id: this.MeetCuteStore.preys[this.cardIndex].key,
        data: {
          time: Date.now(),
        },
        expires: null,
      })
      Alert.alert( 
        '管理員提示', '已封鎖此人', [ 
        {text: '確認', onPress: () => this.swiper.swipeRight()}, ], { cancelable: false } 
      )
  }

  onPressMatchLeft = () => {
    this.MeetCuteStore.finishMatch()
    this.swiper.swipeRight()
  }

  onPressMatchRight = () => {
    this.title = this.MeetCuteStore.preys[this.cardIndex].nickname + '，' + this.MeetCuteStore.preys[this.cardIndex].age
    this.ChatStore.setChatRoomKey(this.chatRoomKey,this._uid)
    this.MeetCuteStore.finishMatch()
    Actions.InitChatRoom({title: this.title, Title: this.title, chatRoomKey: this.chatRoomKey ,preyID: this._uid})
    this.swiper.swipeRight()
  }

  updateGoodImpression = () => {
    this.firebase.database().ref('goodImpressionList/' + this.SubjectStore.uid + this.MeetCuteStore.preys[this.cardIndex].key).set({wooner: this.SubjectStore.uid, prey: this.MeetCuteStore.preys[this.cardIndex].key, time: Date.now()})    
  }

  onSwiped = cardIndex => {
    localdb.save({
      key: 'meetCute' + this.SubjectStore.uid,
      id: this.MeetCuteStore.preys[this.cardIndex].key,
      data: {
        time: Date.now(),
      },
      expires: null,
    })
    this.cardIndex = cardIndex + 1
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {

    return(
      <View style={styles.view}>
        { this.MeetCuteStore.loading ? <BaconActivityIndicator/> :
          this.MeetCuteStore.havepreys ? 
        <View style={styles.view}>
          <BaconCheckMatchContainer/>
          <BaconMatchContainer
            onPressRight={this.onPressMatchRight}
            onPressLeft={this.onPressMatchLeft}
          />
          <BaconGoToChatRoomContainer/>
          <Swiper
            ref={swiper => { this.swiper = swiper}}
            cards={toJS(this.MeetCuteStore.preys)}
            renderCard={(card) => {
            return(
              <BaconCard
                album={card.album}
                displayName={ card.nickname }
                age={ card.age }
                bio={ card.bio }
                distance={ card.distance }
                address={ card.address }
                langs={ card.langs }
                hobbies={ card.hobbies }
                showDistance
                showBlockade
                showReport
                onPressReport={ this.onPressReport }
                onPrssBlockade={ this.onPrssBlockade }
              >
                <View style={styles.tool}>
                  <TouchableOpacity onPress={ this.onPressLeft }>
                    <Image source={require('../../../../../images/btn_meet_dislike.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ this.onPressRight }>
                    <Image source={require('../../../../../images/btn_meet_like.png')}/>
                  </TouchableOpacity>
                </View>
              </BaconCard>
              )
            }}
            onSwiped={this.onSwiped}
            cardIndex={this.cardIndex}
            horizontalSwipe={false}
            verticalSwipe={false}
            secondCardZoom={1}
            backgroundColor={'white'}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            zoomAnimationDuration={0}
            swipeBackCard={false}
            onSwipedAll={this.onSwipedAll}
            //showSecondCard={false}
            infinite={false}
          />
        </View> :
        <View style={styles.view}>
          <Loading
            showWarning
            warning={'已無邂逅對象'}
          />
        </View>
        }
      </View>
    )
  }
}