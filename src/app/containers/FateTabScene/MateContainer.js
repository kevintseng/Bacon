import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'

import { calculateAge } from '../../Utils'
import Cookie from '../../views/Cookie'

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

@inject('firebase','FateStore') @observer
export default class MateContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    this.FateStore.filterMatchList()
    this.FateStore.setMatchFakePreys()
  }

  componentDidMount() {
    this.FateStore.setMatchRealPreys()
    //console.log(this.FateStore.matchPreylist)
  }

  onPress = async uid => {
    await this.FateStore.setCourtInitialize(uid)
    await this.sleep(200)
    Actions.LineCollect({ Store: this.FateStore, title: '緣分' })
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
            <TouchableOpacity onPress={ () => { this.onPress(item.key) } }>
              <Cookie
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
              >
                <View style={styles.view}>
                  <Text style={styles.text}>你們在</Text>
                  <Text style={styles.middleText}> 2017年五月 </Text>
                  <Text style={styles.text}>互有好感</Text>
                </View>
              </Cookie>
            </TouchableOpacity>) 
          } 
        />
      </View>
    )
  }
}
/*
        <Cookie
          name='Dora Li'
          ages='19'
          //onPress={ this.onPress } 
        >
          <View style={styles.view}>
            <Text style={styles.text}>你們在</Text>
            <Text style={styles.middleText}> 2017年五月 </Text>
            <Text style={styles.text}>互有好感</Text>
          </View>
        </Cookie>

      */