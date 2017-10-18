import React, { Component } from 'react'
import { ScrollView, View, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import LangListContainer from './LangListContainer'
import MasterModalContainer from './MasterModalContainer'

const styles = {
  ...Platform.select({
      ios: {
        //
      },
      android: {
        container: {
          flex: 1
        },
        bottom: { 
          position: 'absolute', 
          bottom: 0
        },
        languages: {
          height: 390
        }
      }
  })
}

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
      <View style={styles.container}>
        <View style={styles.languages}>
          <LangListContainer/>
        </View>
        <View style={styles.bottom}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}
