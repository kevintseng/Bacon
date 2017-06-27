import React from 'react'
import { View, Text, TextInput, Platform, Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { observer, inject } from 'mobx-react/native'

const { width, height } = Dimensions.get('window')

const styles = {
  NickBirthday: {
    ...Platform.select({
      ios:{
        flex: 1
      },
      android:{
        flex: 1
      }
    })
  },
  TextView: {
    ...Platform.select({
      ios:{
        paddingTop: 15
      },
      android:{
      }
    })
  },
  TextInput:{
    ...Platform.select({
      ios:{
        height:30, 
        width
      },
      android:{
      }
    })
  },
  Birthday: {
    ...Platform.select({
      ios:{
        paddingTop: 15
      },
      android:{
        paddingTop: 5
      }
    })
  },
  DataPicker: {
    flexDirection: "row",
    paddingTop: 10
  },  
  dataPicker: {
    flex: 1
  }
}

const maxDay = () => {
  const today = new Date();
  const nowYear = today.getFullYear();
  const year = nowYear - 18;
  const month = ('0' + (today.getMonth() + 1).toString()).slice(-2); // Jan = 0, Feb = 1.
  const day = ('0' + today.getDate().toString()).slice(-2);
  const maxDate = year.toString() + '-' + month.toString() + '-' + day;
  return maxDate;
}

const NickBirthday = inject("UIStore")(observer(({ UIStore }) => {
  
  return(
    <View style = { styles.NickBirthday }>
      <View style = {styles.TextView}>
        <View>
          <Text>暱稱</Text> 
        </View>
        <View>
          <TextInput
            //placeholder = { UIStore.displayName }
            style={styles.TextInput}
            maxLength = { 10 }
            numberOfLines = { 1 }
            onChangeText = { (text) => UIStore.setDisplayName(text) }
            value = { UIStore.displayName }
          />
        </View>
      </View>

      <View style = { styles.Birthday }>
        <View>
          <Text>生日</Text> 
        </View>
        <View style = {styles.DataPicker}>
          <DatePicker
            style = { styles.dataPicker }
            date = { UIStore.birthday }
            mode = "date"
            placeholder = "您的生日"
            format = "YYYY-MM-DD"
            minDate = "1950-01-01"
            maxDate = { maxDay() }
            confirmBtnText = "完成"
            cancelBtnText = "取消"
            showIcon = { false }
            onDateChange = { date => UIStore.setBirthday(date) }
          /> 
        </View>
      </View> 

    </View>
  )
}))

export default NickBirthday