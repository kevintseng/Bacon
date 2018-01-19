import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import { calculateAge } from '../../../../../../api/Utils'
import CookieList from '../../../../../views/CookieList'
import localdb from '../../../../../../configs/localdb'

import BaconActivityIndicator from '../../../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1,
    marginTop: 10
  },
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 13
  }
}

@inject('firebase','FateStore') @observer
export default class VisitorsTab extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
  }

  onPress = uid => (
    () => {
      Actions.ChatCourt({ 
        uid: uid, title: '緣分'
      })
    }
  )

  duration = (time) => {
    return Moment.duration(Moment().diff(time)).humanize()
  }

  render() {
    return(
      <View style={styles.view}>
        { this.FateStore.visitorsLoading ? <BaconActivityIndicator/> :
        <FlatList
          data={ this.FateStore.visitorsPreysToFlatList } 
          numColumns={1}
          renderItem={({item}) => 
            (
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={ this.onPress(item.key) }
              >
                <Text style={styles.child}>{this.duration(item.time) + '前來訪'}</Text>
              </CookieList>
              )
            } 
          />
        }
      </View>
    )
  }
}

/*

    //await this.FateStore.setCourtInitialize(uid)
    //await localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
    //  if (ids.includes(uid)) {
    //    Actions.ChatCourt({ Store: this.FateStore, title: '緣分', collection: true })
    //  } else {
    //    Actions.ChatCourt({ Store: this.FateStore, title: '緣分', collection: false })
    //  }
    //}).catch(err => console.log(err)) 
*/