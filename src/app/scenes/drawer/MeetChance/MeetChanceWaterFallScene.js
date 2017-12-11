import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions, Text, InteractionManager } from 'react-native'
import CircleImage from 'react-native-bacon-circle-image'

import Wave from '../../../views/Wave/Wave'
import localdb from '../../../../configs/localdb'

const { width } = Dimensions.get('window')

const x = 5

const radius = (width - 4 * x)/6

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
  },
  cookie: {
    marginTop: 10,
    flex: 1
  },
  loadingStyle: { 
    size: 'small', 
    color: '#b3b3b3' 
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
    //InteractionManager.runAfterInteractions(this.task)
    //this.MeetChanceStore.setPreyList()
    //this.task()
  }

  componentWillUnMount() {
    this.MeetChanceStore.setIndex()
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

  onPress = uid => {
    alert(uid)
    // 來訪記錄
    /*
    this.firebase.database().ref('visitors/' + this.SubjectStore.uid + uid ).set({ wooer: this.SubjectStore.uid , prey: uid, time: Date.now() })
    await this.MeetChanceStore.setCourtInitialize(uid)
    await localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
      if (ids.includes(uid)) {
        Actions.LineCollect({ Store: this.MeetChanceStore, title: '巧遇', collection: true})
      } else {
        Actions.LineCollect({ Store: this.MeetChanceStore, title: '巧遇', collection: false})
      }
    }).catch(err => console.log(err))
    */
  }

  header = () => (
    <View style={ styles.self }>
      <CircleImage radius={75} source={{uri: this.SubjectStore.avatar}} onPress={ this.goToAboutMeTab } />
      <Text style={styles.text}>{this.SubjectStore.nickname}</Text>
    </View>
  )

  fakeOnPress = () => {

  }

  render() {
    return(
      <View style={styles.view}>
        <FlatList
          removeClippedSubviews
          onEndReached={this.MeetChanceStore.addMorePreys}
          onEndReachedThreshold={0.1}
          data={ this.MeetChanceStore.preysToFlatList }
          numColumns={3}
          //contentContainerStyle={styles.container}
          renderItem={({item}) =>
              <View style={styles.cookie}>
                <CircleImage
                  radius={ radius }
                  onPress={ () => { this.onPress(item.key) } }
                  placeholderSource={require('../../../../images/ico_qy_head_preload.png')}
                  loadingStyle={styles.loadingStyle}
                  source={{uri: item.avatar }}
                />
                <Text style={styles.text}>{item.nickname}</Text>
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

    <CircleImage
      radius={ circleSize/2 }
      //borderColor={borderColor}
      //circleBorderWidth={circleBorderWidth}
      //circleColor={circleColor}
      onPress={onPress}
      placeholderSource={require('./img/ico_qy_head_preload.png')}
      loadingStyle={{ size: 'small', color: '#b3b3b3' }}
      source={{uri:avatar}}
      disabled={disabled}
      //isShowActivity={false}
    />

                <Cookie
                  name={ item.nickname }
                  avatar={ item.avatar }
                  onPress={ () => { this.onPress(item.key) } }
                /> 
*/
