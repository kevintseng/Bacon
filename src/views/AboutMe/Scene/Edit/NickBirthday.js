import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
//import InputField from './Components/InputField'

const styles = {
  NickBirthday: {
    flex: 1
  },
  Birthday: {
    paddingTop: 5
  },
  DataPicker: {
    flexDirection: "row",
    paddingTop: 10
  },  
  dataPicker: {
    flex: 1
  }
}
//const { width } = Dimensions.get('window');

const maxDay = () => {
  const today = new Date();
  const nowYear = today.getFullYear();
  const year = nowYear - 18;
  const month = ('0' + (today.getMonth() + 1).toString()).slice(-2); // Jan = 0, Feb = 1.
  const day = ('0' + today.getDate().toString()).slice(-2);
  const maxDate = year.toString() + '-' + month.toString() + '-' + day;
  return maxDate;
}

class NickBirthday extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    return(
      <View style = { styles.NickBirthday }>

        <View>
          <View>
            <Text>暱稱</Text> 
          </View>
          <View>
            <TextInput
              placeholder = "輸入暱稱"
              onChangeText = { (text) => this.setState({ text }) }
              value = { this.state.text }
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
              date = "2017-01-01"
              mode = "date"
              placeholder = "您的生日"
              format = "YYYY-MM-DD"
              minDate = "1950-01-01"
              maxDate = { maxDay() }
              confirmBtnText = "完成"
              cancelBtnText = "取消"
              showIcon = { false }
              onDateChange = { date => this.updateBirthday(date) }
            /> 
          </View>
        </View> 

      </View>
    )
  }
}

export default NickBirthday;