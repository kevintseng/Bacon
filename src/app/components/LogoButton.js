import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  topButtonView: {
    marginBottom: 20, 
    alignItems: 'center'
  },
  topButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center'
  },
  bottomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  bottomLog: {
    marginTop: 20
  },
  topButtonTouchable : {
    paddingBottom: 15
  },
  topButtonPic : {
    justifyContent: 'center'
  },
  bottomButtonPic: {
    justifyContent: 'center'
  }
}

const LogoButton = ({ title,topButtonPic,bottomButtonPic,topButtonText,bottomButtonText,topButtonOnPress,bottomButtonOnPress,topLogo,bottomLog }) => {

  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 100}}>
      <View>
        <Image source={ topLogo } />
      </View>
      <View>
        <Text style={ styles.title }>{ title }</Text>
      </View>
      <View style={ styles.topButtonView }>
        <TouchableOpacity style={ styles.topButtonTouchable } onPress={ topButtonOnPress }> 
          <Image style={ styles.topButtonPic } source={ topButtonPic }>
            <Text style={ styles.topButtonText }>{ topButtonText }</Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={ bottomButtonOnPress }> 
          <Image style={ styles.bottomButtonPic } source={ bottomButtonPic }>
            <Text style={ styles.bottomButtonText }>{ bottomButtonText }</Text>
          </Image>
        </TouchableOpacity>
      </View>
      <View style={ styles.bottomLog }>
        <Image source={ bottomLog } />
      </View>
    </View>
  )
}

export default LogoButton