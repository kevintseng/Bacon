import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { calculateAge } from '../../Utils'
import Cookie from '../../views/Cookie'

const styles = {
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 15
  }
}

@inject('firebase','FateStore') @observer
export default class GoodImpressionContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    this.FateStore.setGoodImpressionPreylist()
    this.FateStore.setGoodImpressionFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
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
      <View>
        <FlatList
          data={ this.FateStore.goodImpressionPreys } 
          numColumns={1}
          renderItem={({item}) => 
          (
            <TouchableOpacity onPress={ () => { this.onPress(item.key) } }>
              <Cookie
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
              >
                <Text style={styles.child}>你們距離大約7.9公里</Text>
              </Cookie>
            </TouchableOpacity>) 
          } 
        />
      </View>
    )
  }
}