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

@inject('firebase','FateStore') @observer
export default class CollectionContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    //this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    //this.FateStore.setVisitorsPreylist()
    //this.FateStore.setVisitorsFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    //this.FateStore.setVisitorsRealPreys()
  }

  onPress = () => {
    Actions.MeetChanceCourt()
  }

  goToUpgradeMember = () => {
    Actions.Upgrade()
  }

  header = () => (
    <View style={ styles.headView }>
      <View style={ styles.count }>
        <Text>目前收藏數</Text>
        <Text>12</Text>
        <Text>/</Text>
        <Text>20</Text>
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
          data={ [{key: 0, nickname: '大頭',avatar: 'https://s1.cutiesgeneration.com/2016/05/ChihYuChen/31.jpg', birthday: '1987-06-20'}] } // local 
          numColumns={1}
          ListHeaderComponent={ this.header }
          renderItem={({item}) => 
          (
            <TouchableOpacity onPress={ this.onPress }>
              <Cookie
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={ this.onPress }
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