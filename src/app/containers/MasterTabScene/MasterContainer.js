import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class MasterContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    await this.sleep(260)
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
 
  render() {

    return(
      <View>
        <Text>MasterContainer</Text>
      </View> 
    )
  }
}
