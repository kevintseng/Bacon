import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions, Text, InteractionManager, ActivityIndicator } from 'react-native'
import CircleImage from 'react-native-bacon-circle-image'

import Wave from '../../../../views/Wave/Wave'
import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'
import localdb from '../../../../../configs/localdb'

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
    this.MeetChanceStore.startLoading()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.MeetChanceStore.fetchPreys()
    })
  }

  header = () => (
    <View style={ styles.self }>
      <CircleImage radius={75} source={{uri: this.SubjectStore.avatar}} onPress={ this.goToAboutMeTab } />
      <Text style={styles.text}>{this.SubjectStore.nickname}</Text>
    </View>
  )

  goToAboutMeTab = () => {
    Actions.AboutMe({
      type: 'replace'
    })
  }

  getItemLayout = (data, index) => (
    {
      length: itemHight, 
      offset: itemHight * index, index
    }
  )

  onPress = uid => (
    () => {
      this.updateVistorHistory(uid)
      Actions.ChatCard({ 
        uid: uid, title: '巧遇'
      })
    }
  )

  updateVistorHistory = uid => {
    this.firebase.database().ref('visitorList/'  + uid + '/' + this.SubjectStore.uid).set(Date.now())
  }

  render() {
    return(
      <View style={styles.view}>
      { this.MeetChanceStore.loading ? <BaconActivityIndicator/> :
        <FlatList
          removeClippedSubviews
          onEndReached={this.MeetChanceStore.addMorePreys}
          onEndReachedThreshold={0.1}
          data={ this.MeetChanceStore.preysToFlatList }
          numColumns={3}
          renderItem={({ item }) =>
            <View style={styles.cookie}>
              <CircleImage
                radius={ radius }
                onPress={ this.onPress(item.key) }
                placeholderSource={ require('../../../../../images/ico_qy_head_preload.png') }
                loadingStyle={ styles.loadingStyle }
                source={{uri: item.avatar }}
              />
              <Text style={styles.text}>{item.nickname}</Text>
            </View>
          }
          ListHeaderComponent={ this.header }
          getItemLayout={ this.getItemLayout }
        />
      }
    </View>
    )
  }
}

/*
  handleOnPress = uid => {
    // 來訪記錄
    //this.firebase.database().ref('visitorList/'  + uid + '/' + this.SubjectStore.uid).set(Date.now())
    localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
      if (ids.includes(uid)) {
        Actions.ChatCourt({ uid: uid, title: '巧遇', collection: true})
      } else {
        Actions.ChatCourt({ uid: uid, title: '巧遇', collection: false})
      }
    }).catch(err => console.log(err))
  }
*/
