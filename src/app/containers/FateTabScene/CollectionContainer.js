import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { calculateAge } from '../../Utils'
import Cookie from '../../views/Cookie'
import { BaconBadgeYes } from '../../views/BaconBadge/BaconBadge'

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
    this.FateStore.setCollectionFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    this.FateStore.setCollectionRealPreys()
  }

  onPress = async uid => {
    await this.FateStore.setCourtInitialize(uid)
    await this.sleep(200)
    Actions.LineCollect({ Store: this.FateStore, title: '緣分' })
  }

  goToUpgradeMember = () => {
    Actions.Upgrade()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  header = () => (
    <View style={ styles.headView }>
      <View style={ styles.count }>
        <Text>目前收藏數</Text>
        <Text>{ this.SubjectStore.collectCount }</Text>
        <Text>/</Text>
        <Text>{ this.SubjectStore.maxCollect }</Text>
      </View>
      <BaconBadgeYes
        text='提高我的收藏上限'
        onPress={ this.goToUpgradeMember }
      />
    </View>
  )
  
  render() {
    return(
      <View>
        <FlatList
          data={ this.FateStore.collectionPreysToFlatList } // local 
          numColumns={1}
          ListHeaderComponent={ this.header }
          renderItem={({item}) => 
          (
            <TouchableOpacity onPress={ () => { this.onPress(item.key) } }>
              <Cookie
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
              >
                <Text style={styles.child}>剛剛收藏</Text>
              </Cookie>
            </TouchableOpacity>) 
          } 
        />
      </View>
    )
  }
}