import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import Lang from '../../../views/Lang/Lang'

@inject('SubjectEditStore','ControlStore') @observer
export default class LangListContainer extends Component {

  constructor(props) {
    super(props)
    this.SubjectEditStore = this.props.SubjectEditStore
    this.ControlStore = this.props.ControlStore
  }

  onPressCheckBox = item => {
    this.ControlStore.setlang(item.key)
    this.ControlStore.setlangAdvanced()
    //this.SubjectEditStore.switchLanguages(item.key)  
  }

  render() {
    return(
      <FlatList
        data={ this.SubjectEditStore.languagesToFlatList } 
        renderItem={ ({item}) => <Lang langName={item.key} check={item.check} onPressCheckBox={ () => { this.onPressCheckBox(item) } } />}
      />
    )
  }
}