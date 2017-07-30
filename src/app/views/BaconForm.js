import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { FormInput } from 'react-native-elements'

const { width } = Dimensions.get('window')

const styles = {
  view: {
    alignItems: 'center'
  }
}

const BaconForm = ({ iconSource, placeholder, value, maxLength, onChangeText, onBlur }) => {
  return(
    <View style={ styles.view }>
      <View>
        <Image source={ iconSource }/>
      </View>

      <View style={{width}}>
        <FormInput
          underlineColorAndroid="#606060"
          autoFocus
          autoCorrect={ false }
          placeholder={ placeholder }
          returnKeyType={'next'}
          keyboardType={'email-address'}
          value={ value }
          maxLength={ maxLength }
          onBlur={ onBlur }
          onChangeText={ onChangeText }
        />
      </View>
    </View>
  )
}

export default BaconForm