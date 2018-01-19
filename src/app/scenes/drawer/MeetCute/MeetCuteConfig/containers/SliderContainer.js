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
    //fontWeight: '500',
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

@inject('MeetCuteStore') @observer
export default class SliderContainer extends Component {

  constructor(props) {
    super(props)
    this.MeetCuteStore = this.props.MeetCuteStore
  }

  onAgeChange = values => {
    this.MeetCuteStore.setMinAge(values[0])
    this.MeetCuteStore.setMaxAge(values[1])
  }

  render() {
    return(
      <View>
        <View style={styles.titleView}>
          <Text style={styles.title}>年齡篩選</Text>
        </View>
        <View style={styles.silderView}>
          <Text style={styles.text}>{this.MeetCuteStore.minAge}</Text>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{this.MeetCuteStore.maxAge === 50 ? '50+': this.MeetCuteStore.maxAge}</Text>
        </View>
        <MultiSlider step={1} min={18} max={50} values={[this.MeetCuteStore.minAge,this.MeetCuteStore.maxAge]} sliderLength={280} onValuesChange={ this.onAgeChange }/>
      </View>
    )
  }
}