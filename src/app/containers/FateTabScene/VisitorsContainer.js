import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import { calculateAge } from '../../Utils'
import CookieList from '../../views/CookieList'
import localdb from '../../../configs/localdb'

const styles = {
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 15
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
    this.FateStore.setVisitorsPreylist()
    //this.FateStore.setVisitorsFakePreys()
  }

  componentDidMount = async () => {
    await this.sleep(260)
    this.FateStore.setVisitorsRealPreys()
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

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  duration = (time) => {
    return Moment.duration(Moment().diff(time)).humanize()
  }

  render() {
    return(
      <View>
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
                <Text style={styles.child}>{this.duration(item.time)}</Text>
              </CookieList>)
          } 
        />
      </View>
    )
  }
}