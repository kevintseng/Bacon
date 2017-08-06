import React from 'react';
import { View, Image, Text, Dimensions, TouchableHighlight } from 'react-native'

const { width } = Dimensions.get('window')

const styles = {
  itemImageStyle: {
    width:80,
    height:80,
    marginBottom:5,
    borderRadius: 80/2,
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

const ADD_IMAGE = require('Bacon/src/images/addImage.png')

//const onPressButton = () => { console.warn("點擊頭像")}

const Cookie = ({ name, ages, photoURL, children, onPressButton }) => {

  return(
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
      <TouchableHighlight onPress={onPressButton}>
        <Image source={ photoURL ? { uri: photoURL } : ADD_IMAGE } style={styles.itemImageStyle}/>
      </TouchableHighlight>
      <View style={{marginLeft:20,paddingBottom: 15}}>
        <View style={{marginBottom: 2}}>
          <Text style={styles.title}>{ name }, { ages }</Text>
        </View>
        <View style={{marginTop: 2}}>
          { children }
        </View>
      </View>
    </View>
  )
}

export default Cookie