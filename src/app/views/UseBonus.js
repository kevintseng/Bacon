import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'
import CircleImage from 'react-native-bacon-circle-image'
import BaconRedButton from './BaconRedButton/BaconRedButton'

const { width, height } = Dimensions.get('window')

const styles = {
  View: { 
    width, 
    marginTop: 20 
  },
  view: { 
    alignItems: 'center', 
    marginBottom: 40
  },
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    //fontSize: 14,
    //fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  colorText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    //fontSize: 14,
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
  reasonStrView: { 
    marginTop: 20, 
    width: 240, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap' 
  },
  topView: { 
    flexDirection: 'row', 
    marginBottom: 20 
  },
  reasonStr: {    
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    //fontSize: 14,
    //fontWeight: '500',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  bottom: { 
    width: 240, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 30
  },
  cost: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 28,
    fontWeight: '500',
    color: '#F4A764',  
    paddingBottom: 10  
  },
  loadingStyle: { 
    size: 'small', 
    color: '#b3b3b3' 
  },
  nickname: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    fontWeight: '500',   
  }
}


const UseBonus = ({bonus, avatar, reasonTopStr, nickname, reasonBottomStr, preStr, cost, postStr,routesText,routesOnPress}) => {
  return (
    <View style={styles.View}>
      <View style={styles.view}>
        <View style={styles.topView}>
          <Text style={styles.text}>你目前有 </Text>
          <Text style={styles.colorText}>{bonus}</Text>
          <Text style={styles.text}> Ｑ點</Text>
        </View>
        <CircleImage
          radius={ 80 }
                //onPress={ this.onPress(item.key) }
          placeholderSource={ require('../../images/ico_qy_head_preload.png') }
          loadingStyle={ styles.loadingStyle }
          source={{uri: avatar }}
        />

        <View style={styles.reasonStrView}>
          <Text style={styles.reasonStr}>{reasonTopStr}</Text>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.reasonStr}>{reasonBottomStr}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>{preStr} </Text>
          <Text style={styles.cost}>{cost}</Text>
           <Text style={styles.text}> Ｑ點</Text>
          <Text style={styles.text}> {postStr}</Text>
        </View>
      </View>
      <BaconRedButton
        routesText={routesText}
        routesOnPress={routesOnPress}
      />
    </View>
  )
}

export default UseBonus
