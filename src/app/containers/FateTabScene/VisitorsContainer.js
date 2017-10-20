import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, InteractionManager } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import { calculateAge } from '../../Utils'
import CookieList from '../../views/CookieList'
import localdb from '../../../configs/localdb'

const styles = {
  view: {
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

@inject('firebase','FateStore','SubjectStore') @observer
export default class VisitorsContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  task = () => {
    this.FateStore.setVisitorsPreylist()
    this.FateStore.setVisitorsRealPreys()
  }

  onPress = async uid => {
    await this.FateStore.setCourtInitialize(uid)
    await localdb.getIdsForKey('collection' + this.SubjectStore.uid).then(ids => {
      if (ids.includes(uid)) {
        Actions.LineCollect({ Store: this.FateStore, title: '緣分', collection: true })
      } else {
        Actions.LineCollect({ Store: this.FateStore, title: '緣分', collection: false })
      }
    }).catch(err => console.log(err)) 
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  duration = (time) => {
    return Moment.duration(Moment().diff(time)).humanize()
  }

  render() {
    return(
      <View style={styles.view}>
        <FlatList
          data={ this.FateStore.visitorsPreysToFlatList } 
          numColumns={1}
          renderItem={({item}) => 
          (
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={()=>this.onPress(item.key)}
              >
                <Text style={styles.child}>{this.duration(item.time) + '前來訪'}</Text>
              </CookieList>)
          } 
        />
      </View>
    )
  }
}