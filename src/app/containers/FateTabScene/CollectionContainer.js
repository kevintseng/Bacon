import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import { calculateAge } from '../../Utils'
import CookieList from '../../views/CookieList'
import { BaconBadgeYes } from '../../views/BaconBadge/BaconBadge'
import localdb from '../../../configs/localdb'

const styles = {
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 15
  },
  headView: {
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5
  },
  count: {
    paddingRight: 20,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  }
}

@inject('firebase','FateStore','SubjectStore') @observer
export default class CollectionContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    //this.FateStore.setCollectionFakePreys()
  }

  componentDidMount = async () => {
    //await this.sleep(260)
    this.FateStore.setCollectionRealPreys()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  onPress = async uid => {
    await this.FateStore.setCourtInitialize(uid)
    //await this.sleep(200)
    await localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
      if (ids.includes(uid)) {
        Actions.LineCollect({ Store: this.FateStore, title: '緣分', collection: true })
      } else {
        Actions.LineCollect({ Store: this.FateStore, title: '緣分', collection: false })
      }
    }).catch(err => console.log(err)) 
  }

  goToUpgradeMember = () => {
    Actions.Upgrade()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  _collections = () => {
    return this.collections || this.FateStore.collectionPreysToFlatList
  }

  header = () => (
    <View style={ styles.headView }>
      <View style={ styles.count }>
        <Text>目前收藏數</Text>
        <Text>{ this._collections().length }</Text>
        <Text>/</Text>
        <Text>{ this.SubjectStore.maxCollect }</Text>
      </View>
      <BaconBadgeYes
        text='提高我的收藏上限'
        onPress={ this.goToUpgradeMember }
      />
    </View>
  )

  duration = (time) => {
    return Moment.duration(Moment().diff(time)).humanize()
  }
  
  render() {
    return(
      <View>
        <FlatList
          removeClippedSubviews
          data={ this._collections() } // local 
          numColumns={1}
          ListHeaderComponent={ this.header }
          renderItem={({item}) => 
          (
           
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={()=>this.onPress(item.key)}
              >
                <Text style={styles.child}>{this.duration(item.time) + '前收藏'}</Text>
              </CookieList>
) 
          } 
        />
      </View>
    )
  }
}