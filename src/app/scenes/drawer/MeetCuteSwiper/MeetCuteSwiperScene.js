import React, { Component } from 'react'
import { View, Dimensions, InteractionManager, Image,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-deck-swiper'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import BaconActivityIndicator from '../../../views/BaconActivityIndicator'
import BaconCard from '../../../views/BaconCard/'

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

@inject('firebase','SubjectStore','MeetCuteStore') @observer
export default class MeetCuteSwiperScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetCuteStore = this.props.MeetCuteStore
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

  onPressLeft = () => {
    this.swiper.swipeLeft()
  }

  onPressRight = () => {
    this.swiper.swipeRight()
  }

  updateGoodImpression = () => {
    this.firebase.database().ref('goodImpressionList/' + this.SubjectStore.uid + this.SubjectStore.meetCutePreys[this.cardIndex].key).set({wooner: this.SubjectStore.uid, prey: this.SubjectStore.meetCutePreys[this.cardIndex].key, time: Date.now()})    
  }

  render() {

    return(
      <View style={styles.view}>
        { this.MeetCuteStore.loading ? <BaconActivityIndicator/> :
        <View style={styles.view}>
          <Swiper
            ref={swiper => { this.swiper = swiper}}
            cards={toJS(this.MeetCuteStore.preys)}
            renderCard={(card) => {
            return(
              <BaconCard
                album={card.album}
                displayName={ card.nickname }
                age={ 20 }
                showDistance
                showBlockade
                showReport
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
            //onSwipedAll={this.onSwipedAll}
            //showSecondCard={false}
            //infinite={true}
          />
          <View style={styles.tool}>
            <TouchableOpacity onPress={ this.onPressLeft }>
              <Image source={require('../../../../images/btn_meet_dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.onPressRight }>
              <Image source={require('../../../../images/btn_meet_like.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        }
      </View>
    )
  }
}