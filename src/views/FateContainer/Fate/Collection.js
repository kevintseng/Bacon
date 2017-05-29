import React from 'react';
import { View, Text, } from 'react-native';

const Collection = () => {
  { console.warn("Collection 被重複render了")}
  return(
    <View>
      <Text>Collection</Text>
    </View>
  )
}

export { Collection }