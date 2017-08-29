import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'

const { width, height } = Dimensions.get('window')

const styles = {
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 17,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  colorText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 17,
    fontWeight: '500',
    color: '#F4A764',
  },
  colorTextLarge: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 36,
    fontWeight: '500',
    color: '#F4A764',
  },
}


const UseBonus = ({balance, cost, avatarUrl, reasonStr, preStr, postStr}) => {
  return (
    <View style={{flex: 1, width, marginTop: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.text}>你目前有 </Text>
          <Text style={styles.colorText}>{balance}</Text>
          <Text style={styles.text}> Q點</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20}}>
        <Avatar
          xlarge
          rounded
          source={{uri: avatarUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zw1icxwZT8B3OG6cIrPvEXCWVvksUxTpx0sI68cQX41tbnUc"}}
        />
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
        <Text style={styles.text}>{reasonStr}</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
        <Text style={styles.text}>{preStr} </Text>
        <Text style={[styles.colorTextLarge, {paddingBottom: 10}]}>{cost}</Text>
        <Text style={styles.text}> {postStr}</Text>
      </View>

    </View>
  )
}

export default UseBonus
