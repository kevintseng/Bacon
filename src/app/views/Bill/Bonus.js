import React from 'react'
import { Image, View, Text,TouchableOpacity, Dimensions } from 'react-native'
import { CheckBox } from 'react-native-elements'
import BaconRoutes from '../BaconRoutes/BaconRoutes'

const { width, height } = Dimensions.get('window')

const styles = {
  text: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',
    fontSize: 15,
    //fontWeight: '500',
    color: '#606060',
    textAlign: 'center',
  },
  image: {
    marginRight: 20,
    marginLeft: 20
  }
}

const Bonus = ({topCheck, middleCheck, upperCheck, topCheckOnPress, middleCheckOnPress, upperCheckOnPress}) => {
  return(
    <View style={{flex: 1,width}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 40}}>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress={ topCheckOnPress }>
          <Image style={styles.image} source={topCheck ? require('./img/btn_radio_1.png') : require('./img/btn_radio_0.png')} />
        </TouchableOpacity>
          <Text style={styles.text}>Q點 200點</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>$95</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 40, marginTop: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress={ middleCheckOnPress }>
          <Image style={styles.image} source={middleCheck ? require('./img/btn_radio_1.png') : require('./img/btn_radio_0.png')} />
        </TouchableOpacity>
          <Text style={styles.text}>Q點 600點</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>$255</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 40,marginTop: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress={ upperCheckOnPress }>
          <Image style={styles.image} source={upperCheck ? require('./img/btn_radio_1.png') : require('./img/btn_radio_0.png')} />
        </TouchableOpacity>
          <Text style={styles.text}>Q點 1200點</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>$490</Text>
        </View>
      </View>
    </View>
  )
}

export default Bonus
