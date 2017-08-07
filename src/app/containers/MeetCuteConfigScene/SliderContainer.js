import React, { Component } from 'react'
import { View, TouchableOpacity, Text,Button } from 'react-native'
import { inject, observer } from 'mobx-react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

const styles = {
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

@inject('SignUpStore') @observer
export default class SliderContainer extends Component {

  constructor(props) {
    super(props)
    this.SignUpStore = this.props.SignUpStore
    this.state = {
      minAge: 18,
      maxAge: 99
    }
  }

  sliderOneValuesChange = values => {
    this.setState({
      minAge: values[0],
      maxAge: values[1]
    })
  }

  render() {
    return(
      <View>
        <View style={{paddingBottom: 10}}>
          <Text style={styles.title}>年齡篩選</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center',paddingBottom: 10}}>
          <Text style={styles.text}>{this.state.minAge}</Text>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{this.state.maxAge}</Text>
        </View>
        <MultiSlider step={1} min={18} max={99} values={[this.state.minAge,this.state.maxAge]} sliderLength={280} onValuesChange={ this.sliderOneValuesChange }/>
      </View>
    )
  }
}