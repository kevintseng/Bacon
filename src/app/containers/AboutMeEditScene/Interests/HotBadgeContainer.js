import React, { Component } from 'react'
import { FlatList, View, Text, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes } from '../../../views/BaconBadge/BaconBadge'
import DefaultInterests from '../../../../configs/DefaultInterests'

const { width } = Dimensions.get('window')

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class HotBadgeContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}><Text style={{color: '#d63768'}}>熱門興趣提示</Text></View>
          <View style={{borderColor: '#d63768',marginTop: 10, height: 140, width, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
            {
              DefaultInterests.map(item => (
                                       

                  <BaconBadgeYes key={item.key} text={item.key} onPress={ () => { this.SubjectEditStore.addHobby(item.key) }}/>
                  
                ))
              }
          </View>
      </View>
    )
  }
}

/*
          <FlatList
            removeClippedSubviews
            data={ DefaultInterests }
            numColumns={4}
            renderItem={({item}) => (<BaconBadgeYes text={item.key} onPress={ () => { this.SubjectEditStore.addHobby(item.key) }}/>)} 
          />
*/