import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import LangListContainer from './LangListContainer'

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class LangsContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SubjectEditStore.setLanguages(Object.assign({}, this.SubjectStore.languages))
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View>
          <LangListContainer/>
        </View>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}