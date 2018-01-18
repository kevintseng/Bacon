import React, { Component } from 'react'
import { View, FlatList, Platform } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import HotBadgeContainer from './containers/HotBadgeContainer'
import InputBadgeContainer from './containers/InputBadgeContainer'
import BadgeWallContainer from './containers/BadgeWallContainer'

const styles = {
  ...Platform.select({
      ios: {
        //
      },
      android: {
        container: {
          flex: 1
        },
        badgeWall: { 
          position: 'absolute', 
          top: 10,  
          alignSelf: 'center'
        },
        input: {
          position: 'absolute', 
          top: 180, 
          alignSelf: 'center'
        },
        hotBadge: {
          position: 'absolute', 
          top: 230, 
          alignSelf: 'center'
        },
        bottom: { 
          position: 'absolute', 
          bottom: 0
        }
      }
  })
}

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class HobbyInjection extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore  
  }

  componentWillMount() {
    this.SubjectEditStore.setHobbies(Object.assign({},this.SubjectStore.hobbies))
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.badgeWall}>
          <BadgeWallContainer/>
        </View>
        <View style={styles.input}>
          <InputBadgeContainer/>
        </View>
        <View style={styles.hotBadge}>
          <HotBadgeContainer/>
        </View>
        <View style={styles.bottom}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}
