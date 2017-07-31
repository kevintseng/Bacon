import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from "mobx-react"

import Lang from '../../../views/Lang/Lang'

@inject('SignUpInStore') @observer
export default class LangListContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpInStore = this.props.SignUpInStore
  }

  changeLang = (item) => {
    item.check = !item.check
  }

  render() {
    return(
      <FlatList
        data={ this.SignUpInStore.langs } 
        renderItem={ ({item}) => <Lang langName={item.key} check={item.check} onPressCheckBox={ () => { this.SignUpInStore.setLang(item.key) }} />}
      />
    )
  }
}