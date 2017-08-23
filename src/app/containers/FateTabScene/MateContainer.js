import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import { calculateAge } from '../../Utils'
import CookieList from '../../views/CookieList'
import localdb from '../../../configs/localdb'

const styles = {
  view: {
    flexDirection: 'row'
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 15
  },
  middleText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#f4a764',
    fontSize: 15    
  }
}

@inject('firebase','FateStore','SubjectStore') @observer
export default class MateContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    this.FateStore.filterMatchList()
    //this.FateStore.setMatchFakePreys()
  }

  componentDidMount = async () => {
    await this.sleep(260)
    this.FateStore.setMatchRealPreys()
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

  render() {
    return(
      <View>
        <FlatList
          data={ this.FateStore.matchPreysToFlatList } 
          numColumns={1}
          renderItem={({item}) => 
          (
              <CookieList
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={()=>this.onPress(item.key)}
              >
                <View style={styles.view}>
                  <Text style={styles.text}>你們在</Text>
                  <Text style={styles.middleText}> 2017年五月 </Text>
                  <Text style={styles.text}>互有好感</Text>
                </View>
              </CookieList>
) 
          } 
        />
      </View>
    )
  }
}