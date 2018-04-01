import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, ActivityIndicator, InteractionManager } from 'react-native'
import { inject, observer } from 'mobx-react'

import AboutContainer from './containers/AboutContainer'
import AccountContainer from './containers/AccountContainer'
import RemindContainer from './containers/RemindContainer'
import HideContainer from './containers/HideContainer'

import Knife from '../../../../views/Knife/Knife'
import BaconActivityIndicator from '../../../../views/BaconActivityIndicator'

const styles = {
  view: {
    flex: 1
  },
  knife: {
    position: 'absolute',
    bottom: 0
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginTop: 30
  }
}

@inject('SubjectStore') @observer
export default class SettingIndexScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    //Actions.refresh({ key: 'Drawer', open: false })
    this.SubjectStore.startLoading()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.SubjectStore.finishLoading)
  }

  render() {
    return(
     <View style={styles.view}>
      { this.SubjectStore.loading ? <BaconActivityIndicator/> :
      <View style={styles.view}>
        <View style={styles.top}>
          <AboutContainer/>
          <AccountContainer/>
        </View>
        <View style={styles.bottom}>
          <HideContainer/>
        </View>
        <View style={styles.knife}>
          <Knife/>
        </View>
      </View>
      }
    </View>
    )
  }
}

/*
<RemindContainer/>
*/