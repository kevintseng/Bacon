import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Cookie from '../../views/Cookie'

const styles = {
  child: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    color: '#b3b3b3',
    fontSize: 15
  }
}


export default class VisitorsContainer extends Component {

  
  render() {
    return(
      <View>
        <Cookie
          name='Dora Li'
          ages='19' 
        >
          <Text style={styles.child}>剛剛來訪</Text>
        </Cookie>
      </View>
    )
  }
}