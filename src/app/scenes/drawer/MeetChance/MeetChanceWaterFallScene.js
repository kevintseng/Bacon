import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions, Text, InteractionManager } from 'react-native'

import Wave from '../../../views/Wave/Wave'
import Cookie from '../../../views/Cookie/Cookie'
import localdb from '../../../../configs/localdb'

const { width } = Dimensions.get('window')

const x = 5

const itemHight = ((width - 4 * x)/3) + 30

const styles = {
  self: {
    alignSelf:'center',
    marginBottom: 10
  },
  text: {
    fontFamily: 'NotoSans',
    fontSize: 15,
    color: '#606060',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  view: {
    flex:1, 
    justifyContent: "flex-start", 
    alignItems: "center"
  },
  cookie: {
    marginTop: 10
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
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  task = () => {
    this.MeetChanceStore.setPreyList()
    this.MeetChanceStore.setRealPreys()
  }

  goToAboutMeTab = () => {
    Actions.AboutMe({type: 'replace'})
  }

  onPress = async uid => {
    // 來訪記錄
    this.firebase.database().ref('visitors/' + this.SubjectStore.uid + uid ).set({ wooer: this.SubjectStore.uid , prey: uid, time: Date.now() })
    await this.MeetChanceStore.setCourtInitialize(uid)
    await localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
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

  fakeOnPress = () => {

  }

  render() {
    return(
      <View style={styles.view}>
        <FlatList
          removeClippedSubviews
          data={ this.MeetChanceStore.preysToFlatList }
          numColumns={3}
          renderItem={({item}) =>
              <View style={styles.cookie}>
                <Cookie
                  name={ item.nickname }
                  avatar={ item.avatar }
                  onPress={ () => { this.onPress(item.key) } }
                /> 
              </View>
            }
            ListHeaderComponent={ this.header }
            getItemLayout={(data, index) => (
            {length: itemHight, offset: itemHight * index, index}
          )}
        />
      </View>
    )
  }
}
/*
        <FlatList
          removeClippedSubviews
          data={ this.MeetChanceStore.preysToFlatList }
          numColumns={3}
          renderItem={({item}) =>
            <Cookie
              name={ item.nickname }
              avatar={ item.avatar }
              onPress={ this.fakeOnPress }
            /> }
            ListHeaderComponent={ this.header }
            getItemLayout={(data, index) => (
            {length: itemHight, offset: itemHight * index, index}
          )}
        />
*/
/*
      {
        !this.MeetChanceStore.notFound &&
      {
        this.MeetChanceStore.notFound &&
        <View style={{ width: 250, marginTop: 200 }}>
          <Text style={styles.text}>抱歉, 您所在的位置搜尋不到任何對象</Text>
        </View>
      }
*/
