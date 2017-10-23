import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'

import Cookie from './Cookie/Cookie'

const styles = {
  view: { 
    flexDirection: 'row', 
    marginBottom: 10,
    marginLeft: 10, 
    marginRight: 10
  },
  cookie: {
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    fontWeight: '500',
    color: '#606060',
    fontSize: 18
  },
  content: {
    flex: 1,
    marginLeft:20,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    //backgroundColor: 'red'
  }
}

const CookieList = ({ name, age, avatar, children, onPress }) => {

  return(
    <TouchableOpacity style={styles.view} activeOpacity={1} onPress={ onPress }>
      <View style={styles.cookie}>
        <Cookie 
          disabled 
          size={80} 
          avatar={avatar} 
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{ name }，{ age }</Text>
        </View>
        <View>
          { children }
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CookieList