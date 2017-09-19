import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const styles = {
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 14,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  colorText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 14,
    fontWeight: '500',
    color: '#F4A764',
  },
  colorTextLarge: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 28,
    fontWeight: '500',
    color: '#F4A764',
  },
}


const UseBonus = ({balance, cost, avatarUrl, reasonStr, preStr, postStr}) => {
  console.log("avatarUrl: ", avatarUrl)
  return (
    <View style={{ width, marginTop: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.text}>你目前有 </Text>
          <Text style={styles.colorText}>{balance}</Text>
          <Text style={styles.text}> Q點</Text>
        </View>
        <Avatar
          xlarge
          rounded
          source={{uri: avatarUrl}}
        />
        <View style={{ marginTop: 10, width: 240, alignItems: 'center' }}>
          <Text style={styles.text}>{reasonStr}</Text>
        </View>
        <View style={{ marginTop: 10, width: 240, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
          <Text style={styles.text}>{preStr} </Text>
          <Text style={[styles.colorTextLarge, {paddingBottom: 10}]}>{cost}</Text>
          <Text style={styles.text}> {postStr}</Text>
        </View>
      </View>
    </View>
  )
}

export default UseBonus
