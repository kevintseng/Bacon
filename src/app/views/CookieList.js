import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import MKPLoadImageView from 'mkp-react-native-image-view'

const DEFAULT_IMAGE = require('./Cookie/img/ico_qy_head_preload.png')

const { width } = Dimensions.get('window')

const circleSize = 80

const circleFixBorder = circleSize/2

const styles = {
  image: {
    width: circleSize,
    height: circleSize,
    marginBottom: 5
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleFixBorder,
    overflow: 'hidden',
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: circleFixBorder + circleFixBorder / 2,
    borderWidth: circleFixBorder,
    borderColor: 'white',
    //backgroundColor: 'red'
  },
    title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    fontWeight: '500',
    color: '#606060',
    fontSize: 15
  }
}

//const onPressButton = () => { console.warn("點擊頭像")}

const CookieList = ({ name, ages, avatar, children, onPress }) => {

  return(
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', margin: 10}} activeOpacity={1} onPress={ onPress }>
      <View style={styles.circle} >
        <MKPLoadImageView style={ styles.image } source={ avatar ? { uri: avatar } : require('./Cookie/img/ico_qy_head_preload.png') } defaultSource={ DEFAULT_IMAGE } />
        <View style={styles.fixCircleClipping} />
      </View>
      <View style={{marginLeft:20}}>
        <View>
          <Text style={{color: '#000000'}}>{ name }, { ages }</Text>
        </View>
        <View>
          { children }
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CookieList