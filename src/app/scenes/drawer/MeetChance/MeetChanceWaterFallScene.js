import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { View, FlatList, Dimensions } from 'react-native'

import Wave from '../../../views/Wave/Wave'
import Cookie from '../../../views/Cookie/Cookie'

const { width } = Dimensions.get('window')

const x = 5

const picWidth = ((width - 4 * x)/3) + 25

const styles = {
  self: {
    alignSelf:'center'
  }
}

@inject('firebase','SubjectStore','MeetChanceStore') @observer
export default class MeetChanceWaterFallScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
    this.MeetChanceStore = this.props.MeetChanceStore
    this.state = {
      preys: new Array
    }
  }

  componentWillMount() {
    this.MeetChanceStore.setPreyList()
    this.MeetChanceStore.setFakePreys()
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    this.MeetChanceStore.setRealPreys()
  }

  goToAboutMeTab = () => {
    Actions.AboutMe({type: 'reset'})
  }

  onPressButton = uid => {
    this.firebase.database().ref('visitors/' + this.SubjectStore.uid + uid ).set({ wooer: this.SubjectStore.uid , prey: uid, time: Date.now() })
    this.MeetChanceStore.setCourtInitialize(uid)
    Actions.LineCollect({ Store: this.MeetChanceStore})
  }

  header = () => (
    <View style={ styles.self }>
      <Cookie size={150} name={this.SubjectStore.nickname} avatar={this.SubjectStore.avatar} onPress={ this.goToAboutMeTab } />
    </View>
  )

  render() {
    return(
    <View style={{flex:1}}>
      <FlatList
        data={ this.MeetChanceStore.preysToFlatList }
        numColumns={3}
        renderItem={({item}) =>
        <Cookie
          name={ item.nickname }
          avatar={ item.avatar }
          onPress={ () => { this.onPressButton(item.key) } }
        /> }
        ListHeaderComponent={ this.header }
        //getItemLayout={(data, index) => (
        //  {length: picWidth, offset: picWidth * index, index}
        //)}
      />
    </View>
    )
  }
}

/*

      <View style={{position: 'absolute', bottom: 0}}>
        <Wave/>
      </View>
*/
