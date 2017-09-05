import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'

import TaskList from '../../views/TaskList'

@inject('firebase') @observer 
export default class TaskContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
  }

  componentWillMount() {
  }

  componentDidMount() {
    //this.firebase.database().ref('users/' + this.uid).once('value')
  }
  
  render() {
    return(
      <View>
        <FlatList
          removeClippedSubviews
          //data={ tasks }
          numColumns={1}
          renderItem={({item}) =>
            <TaskList  
              task={item.task}
              date={item.date}
              />

           }
        />
      </View>
    )
  }
}