import React, { Component } from 'react'
import { ScrollView, View, FlatList, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './BaconRoutesContainer'
import HotBadgeContainer from './HotBadgeContainer'
import InputBadgeContainer from './InputBadgeContainer'
import BadgeWallContainer from './BadgeWallContainer'

const styles = {
  container: {
    ...Platform.select({
      ios: {},
      android: {
        flex: 1
      },
    })
  },
  sec1: {
    ...Platform.select({
      ios: {},
      android: {
        position: 'absolute', top: 10,  alignSelf: 'center'
      }
    })
  },
  sec2: {
    ...Platform.select({
      ios: {},
      android: {
        position: 'absolute', top: 180,  alignSelf: 'center'
      }
    })
  },
  sec3: {
    ...Platform.select({
      ios: {},
      android: {
        position: 'absolute', top: 230,  alignSelf: 'center'
      }
    })
  },
  sec4: {
    ...Platform.select({
      ios: {
      },
      android: {
        position: 'absolute', bottom: 0
      }
    })
  },
}

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class Interests extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    this.SubjectEditStore.setHobbies(Object.assign({},this.SubjectStore.hobbies))
  }

  //componentWillUnmoun() {
  //  this.SubjectEditStore.cleanDeleteInterests()
  //}

  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.sec1}>
          <BadgeWallContainer/>
        </View>
        <View style={styles.sec2}>
          <InputBadgeContainer/>
        </View>
        <View style={styles.sec3}>
          <HotBadgeContainer/>
        </View>
        <View style={styles.sec4}>
          <BaconRoutesContainer/>
        </View>
      </ScrollView>
    )
  }
}
