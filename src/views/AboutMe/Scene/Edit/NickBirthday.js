import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';

const { width } = Dimensions.get('window');

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
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
  //let firebase = this.props.fire

  render(){
    return(
      <View> 
        <Text>暱稱</Text> 
        <TextInput
          style={{height: 40, width: 200}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <DatePicker
          style={{alignSelf: 'center', marginTop: 5, width: width*0.9}}
          date="2017-01-01"
          mode="date"
          placeholder="您的生日"
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate={maxDay()}
          confirmBtnText="完成"
          cancelBtnText="取消"
          showIcon={false}
          onDateChange={date => this.updateBirthday(date)}
        />    
      </View>
    )
  }
}

export default NickBirthday;