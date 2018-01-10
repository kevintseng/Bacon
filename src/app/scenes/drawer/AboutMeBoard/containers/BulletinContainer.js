import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'

import BulletinList from '../../../../views/BulletinList'

@inject('firebase') @observer 
export default class BulletinContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.state = {
      bulletin: []
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.firebase.database().ref('bulletin/').once('value', snap => (
      this.setState({
        bulletin: snap.val()
      })
    ))
  }
  
  render() {
    return(
      <View>
        <FlatList
          removeClippedSubviews
          data={ this.state.bulletin }
          numColumns={1}
          renderItem={({item}) =>
            <BulletinList  
              title={item.title}
              date={item.date}
              />

           }
        />
      </View>
    )
  }
}