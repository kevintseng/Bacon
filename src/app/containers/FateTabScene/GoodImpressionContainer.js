import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { calculateAge, getDistance } from '../../Utils'
import CookieList from '../../views/CookieList'

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
export default class GoodImpressionContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    //this.FateStore.setGoodImpressionFakePreys()
    this.FateStore.setGoodImpressionPreylist()
  }

  componentWillUnmount() {
    console.warn('leave')
  }

  componentDidMount = async () => {
    //await this.sleep(260)
    this.FateStore.setGoodImpressionRealPreys()
  }

  onPress = async uid => {
    await this.FateStore.setCourtInitialize(uid)
    await this.sleep(200)
    Actions.FateCourt()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  render() {
    return(
      <View style={styles.view}>
        <FlatList
          removeClippedSubviews
          data={ this.FateStore.goodImpressionPreys } 
          numColumns={1}
          renderItem={({item}) => 
          (
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={()=>this.onPress(item.key)}
              >
                <Text style={styles.child}>{'你們距離大約' + getDistance(item.latitude,item.longitude,this.SubjectStore.latitude,this.SubjectStore.longitude) + '公里'}</Text>
              </CookieList>
           ) 
          } 
        />
      </View>
    )
  }
}