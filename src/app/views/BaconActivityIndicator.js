import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center'
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 110
  }
}

const BaconActivityIndicator = () => (
  <View style={styles.view}>
    <ActivityIndicator
      style={styles.activityIndicator}
      size='large'
      color='#d63768'
    />
  </View>
)

export default BaconActivityIndicator