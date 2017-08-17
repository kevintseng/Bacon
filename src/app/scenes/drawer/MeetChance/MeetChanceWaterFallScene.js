import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions } from 'react-native'

import Wave from '../../../views/Wave/Wave'
import Cookie from '../../../views/Cookie/Cookie'
import localdb from '../../../../configs/localdb'

const { width } = Dimensions.get('window')

const x = 5

const itemHight = ((width - 4 * x)/3) + 30

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
  }

  componentWillMount() {
    this.MeetChanceStore.setPreyList()
    //this.MeetChanceStore.setFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    this.MeetChanceStore.setRealPreys()
  }

  goToAboutMeTab = () => {
    Actions.AboutMe({type: 'reset'})
  }

  onPress = async uid => {
    // 來訪記錄
    this.firebase.database().ref('visitors/' + this.SubjectStore.uid + uid ).set({ wooer: this.SubjectStore.uid , prey: uid, time: Date.now() })
    await this.MeetChanceStore.setCourtInitialize(uid)
    //await this.sleep(200)
    await localdb.getIdsForKey('collection').then(ids => {
      if (ids.includes(uid)) {
        Actions.LineCollect({ Store: this.MeetChanceStore, title: '巧遇', collection: true})
      } else {
        Actions.LineCollect({ Store: this.MeetChanceStore, title: '巧遇', collection: false})
      }
    }).catch(err => console.log(err)) 
  }

  header = () => (
    <View style={ styles.self }>
      <Cookie size={150} name={this.SubjectStore.nickname} avatar={this.SubjectStore.avatar} onPress={ this.goToAboutMeTab } />
    </View>
  )

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    return(
    <View style={{flex:1}}>
      <FlatList
        removeClippedSubviews
        data={ this.MeetChanceStore.preysToFlatList }
        numColumns={3}
        renderItem={({item}) =>
        <Cookie
          name={ item.nickname }
          avatar={ item.avatar }
          onPress={ () => { this.onPress(item.key) } }
        /> }
        ListHeaderComponent={ this.header }
        getItemLayout={(data, index) => (
          {length: itemHight, offset: itemHight * index, index}
        )}
      />
    </View>
    )
  }
}
