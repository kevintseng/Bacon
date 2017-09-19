import React, { Component } from 'react'
import { ScrollView, View, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import BioInputContainer from './BioInputContainer'

const styles = {
  container: {
    ...Platform.select({
      ios: {},
      android: {
        flex: 1
      }
    })
  },
}

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BioContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    this.SubjectEditStore.setBio(this.SubjectStore.bio)
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <BioInputContainer/>
        </View>
        <View>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}
