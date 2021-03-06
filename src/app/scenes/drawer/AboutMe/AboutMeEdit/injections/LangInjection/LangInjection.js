import React, { Component } from 'react'
import { ScrollView, View, Platform, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import LangListContainer from './containers/LangListContainer'
import MasterModalContainer from './containers/MasterModalContainer'

const { width, height } = Dimensions.get('window')

const styles = {
        container: {
          flex: 1,
          alignItems: 'center'
        },
        bottom: { 
          position: 'absolute', 
          bottom: 0
        },
        languages: {
          height: 390,
          width
        }
}

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class LangInjection extends Component {

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
        <MasterModalContainer/>
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
