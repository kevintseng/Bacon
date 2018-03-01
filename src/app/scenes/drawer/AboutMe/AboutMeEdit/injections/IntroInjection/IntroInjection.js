import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'

import BaconRoutesContainer from './containers/BaconRoutesContainer'
import DisplayNameContainer from './containers/DisplayNameContainer'
import BirthdayContainer from './containers/BirthdayContainer'

const styles = {
  view: {
    flex: 1,
    alignItems: 'center'
  }
}

@inject('SubjectStore','SubjectEditStore','firebase') @observer
export default class IntroInjection extends Component {

  constructor(props) {
    super(props)
    this.SubjectStore = this.props.SubjectStore
    this.SubjectEditStore = this.props.SubjectEditStore
    this.firebase = this.props.firebase
  }

  componentWillMount() {
    this.SubjectEditStore.setNickname(this.SubjectStore.nockname)
    this.SubjectEditStore.setBirthday(this.SubjectStore.birthday)
  }

  render() {
    return(
      <View style={styles.view}>
        <DisplayNameContainer/>
        <ScrollView scrollEnabled={false} style={{marginTop: 20}}>
          <BirthdayContainer/>
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0}}>
          <BaconRoutesContainer/>
        </View>
      </View>
    )
  }
}
