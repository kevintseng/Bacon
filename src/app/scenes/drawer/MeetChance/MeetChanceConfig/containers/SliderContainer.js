import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import MultiSlider from 'react-native-multi-slider'

const styles = {
  titleView: {
    paddingBottom: 10
  },
  silderView: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingBottom: 10
  },
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontSize: 17,
    color: '#606060'
  },
  text : {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    fontSize: 23,
    color: '#606060'
  }
}

@inject('MeetChanceStore') @observer
export default class SliderContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetChanceStore = this.props.MeetChanceStore
  }

  onAgeChange = values => {
    this.MeetChanceStore.setMinAge(values[0])
    this.MeetChanceStore.setMaxAge(values[1])
  }

  render() {
    return(
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>年齡篩選</Text>
        </View>
        <View style={styles.silderView}>
          <Text style={styles.text}>{this.MeetChanceStore.minAge}</Text>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{this.MeetChanceStore.maxAge === 50 ? '50+' : this.MeetChanceStore.maxAge}</Text>
        </View>
        <MultiSlider step={1} min={18} max={50} values={[this.MeetChanceStore.minAge,this.MeetChanceStore.maxAge]} sliderLength={280} onValuesChange={ this.onAgeChange }/>
      </View>
    )
  }
}