import React, { Component } from 'react'
import { View, Text, Button, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

const styles = {
  edit: {
    flex: 1
  }
}

@inject("SubjectStore") @observer
export default class AboutMeEditScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ title: this.props.title })
  }

  componentWillUnmount() {
    console.warn('儲存狀態並非同步上傳資料')
  }

  render() {
    return(
      <View style = {styles.edit}>
        { this.props.content }
      </View>
    )
  }
}