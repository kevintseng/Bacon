import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Cookie from '../../views/Cookie/Cookie'

const styles = {
  view: {
    flexDirection: 'row'
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 15
  },
  middleText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#f4a764',
    fontSize: 15    
  }
}


export default class MateContainer extends Component {

  
  render() {
    return(
      <View>
        <Cookie
          name='Dora Li'
          ages='19' 
        >
        <View style={styles.view}>
          <Text style={styles.text}>你們在</Text>
          <Text style={styles.middleText}> 2017年五月 </Text>
          <Text style={styles.text}>互有好感</Text>
        </View>
        </Cookie>
      </View>
    )
  }
}