import React from 'react'
import { View, Text,TouchableOpacity, Dimensions, Image } from 'react-native'
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

const Upgrade = ({topCheck, upperCheck, topCheckOnPress, upperCheckOnPress}) => {
  return(
    <View style={{flex: 1,width}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 40}}>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress={ topCheckOnPress }>
          <Image style={styles.image} source={topCheck ? require('./img/btn_radio_1.png') : require('./img/btn_radio_0.png')} />
        </TouchableOpacity>
          <Text style={styles.text}>三個月</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>$350</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 40,marginTop: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress={ upperCheckOnPress }>
          <Image style={styles.image} source={upperCheck ? require('./img/btn_radio_1.png') : require('./img/btn_radio_0.png')} />
        </TouchableOpacity>
          <Text style={styles.text}>一年</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>$930</Text>
        </View>
      </View>
    </View>
  )
}

export default Upgrade
