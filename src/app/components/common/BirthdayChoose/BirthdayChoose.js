import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'

const { width } = Dimensions.get('window')

const BirthdayChoose = ({birthday, minDate, maxDate, onChangeBirthday}) => {
  return(
    <View>
      <Image source={require('./img/btn_index_join.png')}>
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