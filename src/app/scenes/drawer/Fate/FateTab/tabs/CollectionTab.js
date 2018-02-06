import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import { calculateAge } from '../../../../../../api/Utils'
import CookieList from '../../../../../views/CookieList'
import { BaconBadgeYes } from '../../../../../views/BaconBadge/BaconBadge'
import localdb from '../../../../../../configs/localdb'

import BaconActivityIndicator from '../../../../../views/BaconActivityIndicator'

const styles = {
  view: {
    marginTop: 10,
    flex: 1
  },
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 13
  },
  headView: {
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    marginBottom: 10
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
  }


  onPress = uid => (
    () => {
      Actions.ChatCard({ 
        uid: uid, 
        title: '緣分',
        refreshCollect: true
      })
    }
  )

  goToUpgradeMember = () => {
    Actions.Upgrade()
    //alert('轉到收藏')
  }

  //getCollectNumber = () => {
  //  return this.FateStore.collectionPreysToFlatList.length
  //}

  header = () => (
    <View style={ styles.headView }>
      <View style={ styles.count }>
        <Text>目前收藏數</Text>
        <Text>{ this.FateStore.collectionPreysToFlatList.length }</Text>
        <Text>/</Text>
        <Text>{ this.SubjectStore.maxCollectNumber }</Text>
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
      <View style={styles.view}>
      { this.FateStore.collectionLoading ? <BaconActivityIndicator/> :
        <FlatList
          removeClippedSubviews
          data={ this.FateStore.collectionPreysToFlatList } // local 
          numColumns={1}
          ListHeaderComponent={ this.header }
          renderItem={({item}) => 
            (
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={ this.onPress(item.key) }
              >
                <Text style={styles.child}>{this.duration(item.time) + '前收藏'}</Text>
              </CookieList>
            ) 
          } 
        />
        }
      </View>
    )
  }
}