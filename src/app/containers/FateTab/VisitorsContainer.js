import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { observer, inject } from 'mobx-react'

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
export default class VisitorsContainer extends Component {


  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.FateStore = this.props.FateStore
  }

  componentWillMount() {
    this.FateStore.setFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    this.FateStore.setRealPreys()
  }
  
  render() {
    return(
      <View>
        <FlatList
          data={ this.FateStore.preys } 
          numColumns={1}
          renderItem={({item}) => 
          (
            <Cookie
              name={ item.nickname }
              ages={ item.age }
            >
              <Text style={styles.child}>剛剛來訪</Text>
            </Cookie>) 
          } 
        />
      </View>
    )
  }
}