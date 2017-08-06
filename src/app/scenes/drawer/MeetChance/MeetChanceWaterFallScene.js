import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions } from 'react-native'
//import update from 'react-addons-update'

import Wave from '../../../views/Wave/Wave'
import Cookie from '../../../views/Cookie/Cookie'

const { width } = Dimensions.get('window')

const x = 5

const picWidth = (width - 4 * x)/3

const styles = {
  self: {
    alignSelf:'center'  
  }
}

@inject('firebase','SubjectStore','MeetChanceStore') @observer
export default class MeetChanceWaterFallScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetChanceStore = this.props.MeetChanceStore
    this.state = {
      preys: new Array
    }
  }

  componentWillMount() {
    this.MeetChanceStore.setPreyList()
    this.MeetChanceStore.setFakePreys()
    //this.setState({preys: this.MeetChanceStore.preyList.map((ele,index)=>({ key: ele.uid, nickname: null, avatar: null }))})

    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
 /*   
      this.MeetChanceStore.preyList.forEach((ele,index) => {
        this.firebase.database().ref('users/' + ele.uid).once('value').then(snap => {
          if (snap.val()) {
            this.state.preys[index] = {
              key: ele.uid,
              nickname: snap.val().displayName,
              avatar: snap.val().photoURL              
            } 
            this.setState({preys: this.state.preys})
          }
        })
      })
    */
    this.MeetChanceStore.setRealPreys()
  }

  goToAboutMeTab = () => {
    Actions.aboutme({type: 'res'})
  }

  onPressButton = () => {
    //Actions.MeetChanceCourt()
  }

  header = () => (
    <View style={ styles.self }>
      <Cookie size={150} name={this.SubjectStore.nickname} photoURL={this.SubjectStore.avatar}/>
    </View>
  )

  render() {
    return(
    <View style={{flex:1}}>
      <FlatList
        data={this.MeetChanceStore.preys} 
        numColumns={3}
        extraData={this.state}
        renderItem={({item}) => 
        <Cookie  
          name={ item.nickname } 
          photoURL={ item.avatar }
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

