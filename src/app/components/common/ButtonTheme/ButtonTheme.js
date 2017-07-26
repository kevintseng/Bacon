import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import Wave from '../layout/Wave/Wave'

const styles = {
  ButtonTheme: {
    position: 'absolute',
    bottom: 120, 
    alignSelf: 'center'
  },
  buttonImage: {
    justifyContent: 'center'
  },
  warningView: {
    marginTop: 5
  },
  buttonText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',  
    fontSize: 20
  },
  warningText: {
    backgroundColor: 'transparent',
    letterSpacing: 3,
    fontFamily: 'NotoSans',  
    textAlign: 'center', 
    fontWeight: '500',
    color: '#606060',
    fontSize: 10
  }
}

const ButtonTheme = ({ children, buttonText, buttonOnPress, warningText, warningOnPress }) => {
  return(
    <Wave>
      { children }
      <View style={ styles.ButtonTheme }>
        
        <View>
          <TouchableOpacity onPress={ buttonOnPress }> 
            <Image style={ styles.buttonImage } source={require('./img/btn_gredient.png')}>
              <Text style={ styles.buttonText }>{ buttonText }</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View style={ styles.warningView }>
          <TouchableOpacity onPress={ warningOnPress }> 
            <Text style={ styles.warningText }>{ warningText }</Text>
          </TouchableOpacity>
        </View>

      </View>

    </Wave>
  )
}

ButtonTheme.propTypes = {
  buttonText: PropTypes.string,
  buttonOnPress: PropTypes.func,
  warningText: PropTypes.string,
  warningOnPress: PropTypes.func
}

export default ButtonTheme