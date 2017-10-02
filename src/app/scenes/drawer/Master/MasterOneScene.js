import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

import BaconRoutesContainer from '../../../containers/MasterOneScene/BaconRoutesContainer'
import ContentContainer from '../../../containers/MasterOneScene/ContentContainer'
import BlankButton from '../../../views/BlankButton/BlankButton'

const styles = {
  view: {
    flex: 1
  },
  top: {
    position: 'absolute', 
    top: 100
  },
  middle: {
   position: 'absolute', 
   bottom: 210, 
   alignSelf: 'center' 
  },
  bottom: {
    position: 'absolute', 
    bottom: 0
  }
}

export default class MasterOneScene extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount () {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  buttonOnPress () {
    //
  }

  render() {
    return(
      <View style={ styles.view }>


        <View style={ styles.top }>
          <ContentContainer/>
        </View>

        <View style={ styles.middle }>
          <BlankButton
            text='我要預約'
            routesOnPress={ this.buttonOnPress } 
          />
        </View>

        <View style={ styles.bottom }>
          <BaconRoutesContainer/>
        </View>
        
      </View>
    )
  }
}

/*
        <View style={ styles.middle }>
          <SexChooseContainer/>
        </View>
*/

