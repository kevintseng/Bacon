import React, { Component } from 'react'
import { View, Dimensions, InteractionManager, Image,TouchableOpacity, Modal, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import BaconCard from 'react-native-bacon-card'
import Swiper from 'react-native-deck-swiper'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'
import BaconCheckMatch from '../../../../views/BaconCheckMatch'
import BaconMatch from '../../../../views/BaconMatch'

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

@inject('firebase','SubjectStore','MeetCuteStore','ChatStore') @observer
export default class MeetCuteSwiperScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
    this.ChatStore = this.props.ChatStore
    this.cardIndex = 0
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    this.MeetCuteStore.startLoading()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.MeetCuteStore.fetchPreys(this.SubjectStore.preySexualOrientation)
    })
  }

  onSwipedAll = () => {
    //this.MeetCuteStore.startLoading()
    this.cardIndex = 0
    //this.MeetCuteStore.fetchPreys(this.SubjectStore.preySexualOrientation)
  }

  onPressLeft = () => {
    this.swiper.swipeLeft()
  }

  onPressRight = () => {
    this.MeetCuteStore.startCheckMatch()
    this.updateGoodImpression()
    this.firebase.database().ref('goodImpressionList/' + this.MeetCuteStore.preys[this.cardIndex].key + this.SubjectStore.uid).once('value',snap => {
      this.MeetCuteStore.finishCheckMatch()
      if (snap.val()) {
        this.MeetCuteStore.setMatch()
      } else {
        this.swiper.swipeRight()
      }
    })
  }

  onPressReport = () => {
    alert('已通知官方檢舉訊息')
  }

  onPrssBlockade = () => {
    alert('已封鎖此人')
  }

  onPressMatchLeft = () => {
    this.MeetCuteStore.finishMatch()
    this.swiper.swipeRight()
  }

  onPressMatchRight = () => {
    this.MeetCuteStore.finishMatch()
    this.swiper.swipeRight()
    const _uid = this.MeetCuteStore.preys[this.cardIndex].key
    const chatRoomKey = this.SubjectStore.uid > _uid ? this.SubjectStore.uid + _uid : _uid + this.SubjectStore.uid
    const title = this.MeetCuteStore.preys[this.cardIndex].nickname + '，' + this.MeetCuteStore.preys[this.cardIndex].age
    this.ChatStore.setChatRoomKey(chatRoomKey,_uid)
    Actions.InitChatRoom({title: title, Title: title, chatRoomKey: chatRoomKey ,preyID: _uid})
    //Actions.MatchChatRoom({type: 'reset', title: title, chatRoomKey: chatRoomKey,preyID: _uid})
  }

  updateGoodImpression = () => {
    this.firebase.database().ref('goodImpressionList/' + this.SubjectStore.uid + this.MeetCuteStore.preys[this.cardIndex].key).set({wooner: this.SubjectStore.uid, prey: this.MeetCuteStore.preys[this.cardIndex].key, time: Date.now()})    
  }

  render() {

    return(
      <View style={styles.view}>
        { this.MeetCuteStore.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
          <BaconCheckMatch
            visible={this.MeetCuteStore.checking}
            text={'檢查配對中'}
          />
          <BaconMatch
            visible={this.MeetCuteStore.match}
            onPressReturn={()=>{}}
            leftText={'     繼續邂逅'}
            onPressRight={this.onPressMatchRight}
            onPressLeft={this.onPressMatchLeft}
          />
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
              />
              )
            }}
            onSwiped={(cardIndex) => {this.cardIndex = cardIndex + 1}}
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
            infinite={true}
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