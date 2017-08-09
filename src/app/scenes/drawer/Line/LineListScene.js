import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import { calculateAge } from '../../../Utils'
import Cookie from '../../../views/Cookie'

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
export default class LineListScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  onPress = () => {
    Actions.Line()
  }
  
  render() {
    return(
      <View>
        <FlatList
          data={ [{key: 0, nickname: '大頭',avatar: 'https://s1.cutiesgeneration.com/2016/05/ChihYuChen/31.jpg', birthday: '1987-06-20'}] } // local 
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
                <Text style={styles.child}>剛剛聊天</Text>
              </Cookie>
            </TouchableOpacity>) 
          } 
        />
      </View>
    )
  }
}