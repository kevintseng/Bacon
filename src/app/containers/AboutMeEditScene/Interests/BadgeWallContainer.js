import React, { Component } from 'react'
import { FlatList, View, Text, Dimensions, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import { BaconBadgeYes, BaconBadgeNo } from '../../../views/BaconBadge/BaconBadge'

const { width } = Dimensions.get('window')

@inject('firebase','SubjectEditStore','SubjectStore') @observer
export default class BadgeWallContainer extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectEditStore = this.props.SubjectEditStore
    this.SubjectStore = this.props.SubjectStore
  }

  render() {
    return(
          <View style={{height: 140, width: width - 8, marginLeft: 8}}>
            <ScrollView>
              <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start'}}>
                {
                  this.SubjectEditStore.hobbiesToFlatList.map(item => {
                    if(item.check) {
                      return (
                          <BaconBadgeYes key={item.key} text={item.key} onPress={ () => { this.SubjectEditStore.switchHobbies(item.key)} } />
                      )
                    } else {
                      return (
                          <BaconBadgeNo key={item.key} text={item.key} onPress={ () => { this.SubjectEditStore.switchHobbies(item.key)} } />
                      )
                    }
                  })
                }
              </View>
            </ScrollView>
          </View>
    )
  }
}

/*
        <FlatList
          removeClippedSubviews
          data={ this.SubjectEditStore.hobbiesToFlatList }
          numColumns={4}
          renderItem={({item}) => {
            if(item.check) {
              return (
                <View style={{minWidth: width/4}}>
                  <BaconBadgeYes text={item.key} onPress={ () => { this.SubjectEditStore.switchHobbies(item.key)} } />
                </View>
              )
            } else {
              return (
                <View style={{minWidth: width/4}}>
                  <BaconBadgeNo text={item.key} onPress={ () => { this.SubjectEditStore.switchHobbies(item.key)} } />
                </View>
              )
            }
          }} 
        />
*/