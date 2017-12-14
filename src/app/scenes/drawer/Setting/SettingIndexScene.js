import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { View, ActivityIndicator, InteractionManager } from 'react-native'
import { inject, observer } from 'mobx-react'

import AboutContainer from '../../../containers/SettingIndexScene/AboutContainer'
import AccountContainer from '../../../containers/SettingIndexScene/AccountContainer'
import RemindContainer from '../../../containers/SettingIndexScene/RemindContainer'
import HideContainer from '../../../containers/SettingIndexScene/HideContainer'

import Knife from '../../../views/Knife/Knife'

@inject('SubjectStore') @observer
export default class SettingIndexScene extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
    this.SubjectStore.cleanSettingModal()
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.task)
  }

  componentWillUnmount() {
    //console.warn('解除了')
  }

  task = async () => {
    await this.sleep(260)
    this.SubjectStore.openSettingModal()
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    return(
     <View style={{flex: 1}}>
        { this.SubjectStore.settingModal ?
        <View style={{flex: 1,justifyContent: 'center'}}>
          <ActivityIndicator
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              paddingBottom: 110
            }}
            size="large"
            color='#d63768'
          />
        </View> :
      <View style={{flex: 1}}>

        <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop: 50}}>
          <AboutContainer/>
          <AccountContainer/>
        </View>

        <View style={{flexDirection: 'row',justifyContent: 'space-around', marginTop: 30}}>
          <HideContainer/>
        </View>

        <View style={{position: 'absolute',bottom: 0}}>
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