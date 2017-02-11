import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
} from 'react-native';
import {CheckBox, FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { getAge } from '../utils/Utils';
// import Reactotron from 'reactotron-react-native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const styles = {
  errStyle: {
    marginLeft: 20,
    color: 'red',
    fontSize: 12
  }
};

function maxDay() {
  const now = new Date();
  const nowYear = now.getFullYear();
  const maxYear = nowYear - 18;

  let maxDate = maxYear.toString() + '-' + now.getMonth().toString() + '-' + now.getDay().toString();
  return maxDate;
}


export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: {
          width,
          height
      },
      maxDate: maxDay(),
      email: '',
      password: '',
      nickname: '',
      birthday: '',
      loading: false,
      termsAgreed: false,
      birthdayErr: false,
      nickErr: false,
      passErr: false,
      emailErr: false,
      termsErr: false,
    };
    this.allCheck = this.allCheck.bind(this);
    this.emailCheck = this.emailCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
    this.nicknameCheck = this.nicknameCheck.bind(this);
    this.birthdayCheck = this.birthdayCheck.bind(this);
    this.termsCheck = this.termsCheck.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  maxDay = () => {
    const now = new Date();
    const nowYear = now.getFullYear();
    const maxYear = nowYear - 18;

    let maxDate = maxYear.toString() + '-' + now.getMonth().toString() + '-' + now.getDay().toString();
    return maxDate;
  };

  updateTermAgreement = () => {
    this.setState({
      termsAgreed: !this.state.termsAgreed,
      termsErr: false,
    });
    this.termsCheck;
  }

  updateEmail = email => {
    this.setState({
      email: email.trim(),
      emailErr: false,
    });
  }

  updatePassword = password => {
    this.setState({
      password: password.trim(),
      passErr: false,
    });
  }

  updateNickname = (nickname) => {
    this.setState({
      nickname: nickname.trim(),
      nickErr: false,
    });
  }

  updateBirthday = bday => {
    this.setState({
      birthday: bday.trim(),
      birthdayErr: false,
    });
  }

  emailCheck() {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
      return true;
    }
    this.setState({
      emailErr: '咦？請再檢查一次email是否正確?',
    })
    return false;
  }

  passwordCheck() {
    const passw =  /^[A-Za-z0-9]{6,10}$/;
    if(this.state.password.match(passw))
    {
      return true;
    } else {
      this.setState({
        passErr: '請輸入數字或英文字母組合的6~10字密碼',
      })
      return false;
    }
  }

  nicknameCheck() {
    if(this.state.nickname.length < 2) {
      this.setState({
        nickErr: '請輸入2個字以上的名稱',
      })
      return false;
    }
    return true;
  }

  birthdayCheck() {
    //check birthday must not be ''
    if(this.state.birthday == '') {
      this.setState({
        birthdayErr: '請提供您的生日',
      })
      return false;
    }
    // Check age must be 18 and above
    if(getAge(this.state.birthday) < 18) {
      this.setState({
        birthdayErr: '本App僅提供滿18歲以上用戶使用',
      })
      return false;
    }
    return true;
  }

  termsCheck() {
    if(!this.state.termsAgreed) {
      this.setState({
        termsErr: '抱歉, 您必須先同意本App之所有條款後才能使用服務',
      })
      return false;
    }
    return true;
  }

  allCheck() {
    const emailOk = this.emailCheck();
    const passwordOk = this.passwordCheck();
    const nameOk = this.nicknameCheck();
    const bdayOk = this.birthdayCheck();
    const termsOk = this.termsCheck();
    if(emailOk && passwordOk && nameOk && bdayOk && termsOk){
      this.goNext();
      return true;
    }
    return false;
  }

  goNext() {
    Actions.signup2({
      email: this.state.email,
      password: this.state.password,
      nickname: this.state.nickname,
      birthday: this.state.birthday,
    });
  }

  handleSubmit = () => {
    this.allCheck()
  }

  render() {
    const { email, password, nickname, birthday, termsAgreed, maxDate, birthdayErr, emailErr, termsErr, nickErr, passErr } = this.state;
    return (
      <View style={this.state.size}>
        <FormLabel>帳號 Email</FormLabel>
        {
          emailErr &&
          <Text style={styles.errStyle}>
            {emailErr}
          </Text>
        }
        <FormInput
          autoFocus={true}
          autoCorrect={false}
          value={email}
          placeholder='範例：sample@email.com'
          returnKeyType={'next'}
          keyboardType={'email-address'}
          maxLength={50}
          onBlur={this.emailCheck}
          onChangeText={
            email => this.updateEmail(email)
          }
          onSubmitEditing={this.allCheck} />
        <FormLabel>密碼</FormLabel>
        {
          passErr &&
          <Text style={styles.errStyle}>
          {passErr}
          </Text>
        }
        <FormInput ref='passwrd'
        placeholder='請輸入6~10字英數組合密碼' secureTextEntry
        maxLength={10}
        onBlur={this.passwordCheck}
        value={password}
        returnKeyType={'next'}
        onChangeText={
          password => this.updatePassword(password)
        }/>
        <FormLabel>顯示名稱</FormLabel>
        {
          nickErr &&
          <Text style={styles.errStyle}>
          {nickErr}
          </Text>
        }
        <FormInput ref='nickname'
        placeholder='請輸入您的大名(2個字以上)'
        value={nickname}
        onBlur={this.nicknameCheck}
        returnKeyType={'next'}
        maxLength={20}
        onChangeText={nickname => this.updateNickname(nickname)}/>
        <FormLabel>生日</FormLabel>
        {
          birthdayErr &&
          <Text style={styles.errStyle}>
          {birthdayErr}
          </Text>
        }
        <DatePicker
          style={{alignSelf: 'center', marginTop: 5, width: this.state.size.width*0.9}}
          date={birthday}
          mode="date"
          placeholder="您的生日"
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate={maxDate}
          confirmBtnText="完成"
          cancelBtnText="取消"
          showIcon={false}
          onDateChange={date => this.updateBirthday(date)}
        />
        <CheckBox
          title='我同意Hookup隱私權政策及使用條款'
          onBlur={this.termsCheck}
          checked={termsAgreed}
          onPress={this.updateTermAgreement}
        />
        {
          termsErr &&
          <Text style={styles.errStyle}>
          {termsErr}
          </Text>
        }
        <Button
          raised
          backgroundColor='#a022ae'
          title={'送出'}
          onPress={this.handleSubmit}
        />
        {
          this.state.loading && <ActivityIndicator />
        }
      </View>
    );
  }
}
