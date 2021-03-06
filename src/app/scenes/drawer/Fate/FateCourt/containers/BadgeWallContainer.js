import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes } from '../../../../views/BaconBadge/BaconBadge'

const styles = {
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center'    
  }
}

@inject('FateStore') @observer
export default class BadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.FateStore = this.props.FateStore
  }

  showBadge = () => (
    this.FateStore.hobbiesToFlatList.map((ele) => (<BaconBadgeYes key={ele.key} text={ele.key}/>))
  )

  render() {
    return(
      <View style={styles.badges}>
        { this.showBadge() }
      </View>
    )
  }
}