import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { calculateAge } from '../../Utils'
import Cookie from '../../views/Cookie/Cookie'

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
export default class VisitorsContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    this.FateStore.setVisitorsPreylist()
    this.FateStore.setVisitorsFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    this.FateStore.setVisitorsRealPreys()
  }

  onPress = () => {
    alert('轉到聊天')
  }
  
  render() {
    return(
      <View>
        <FlatList
          data={ this.FateStore.visitorsPreys } 
          numColumns={1}
          renderItem={({item}) => 
          (
            <TouchableOpacity onPress={ this.onPress }>
              <Cookie
                name={ item.nickname }
                avatar={ item.avatar }
                age={ calculateAge(item.birthday) }
                onPress={ this.onPress }
              >
                <Text style={styles.child}>剛剛來訪</Text>
              </Cookie>
            </TouchableOpacity>) 
          } 
        />
      </View>
    )
  }
}