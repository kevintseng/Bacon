import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'

const { width } = Dimensions.get('window')

const styles = {
  view: {
    alignItems: 'center'
  },
  birthday: {
    marginTop: 20
  }
}

const BirthdayChoose = ({birthday, minDate, maxDate, onChangeBirthday}) => {
  return(
    <View style={ styles.view }>

      <View>
        <Image source={require('./img/ico_logo_bd.png')}/>
      </View>

      <Image style={ styles.birthday } source={require('./img/btn_index_join.png')}>
        <DatePicker
          style={{flex:1, width: width - 62, justifyContent: 'center', alignSelf: 'center' }}
          customStyles={{
              dateInput: {
                borderWidth: 0
              }
            }}
          date={ birthday }
          mode="date"
          placeholder={ birthday || '您的生日' }
          format="YYYY-MM-DD"
          minDate={ minDate }
          maxDate={ maxDate }
          confirmBtnText="完成"
          cancelBtnText="取消"
          showIcon={false}
          onDateChange={ onChangeBirthday }
        />
      </Image>

    </View>
  )
}

export default BirthdayChoose