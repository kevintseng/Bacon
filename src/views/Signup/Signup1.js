import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
} from 'react-native';
import {CheckBox, FormLabel, FormInput, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';

import { observer } from 'mobx-react/native';
import { getAge, checkEmail } from '../../Utils';
import { Header } from '../../components';
import SignupStore from '../../store/SignupStore'

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const styles = {
  errStyle: {
    marginLeft: 20,
    color: 'red',
    fontSize: 12
  }
};

function maxDay() {
  const today = new Date();
  const nowYear = today.getFullYear();
  const year = nowYear - 18;
  const month = ('0' + (today.getMonth() + 1).toString()).slice(-2); // Jan = 0, Feb = 1.
  const day = ('0' + today.getDate().toString()).slice(-2);
  const maxDate = year.toString() + '-' + month.toString() + '-' + day;
  return maxDate;
}

@observer
class Signup1 extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.sustore = new SignupStore();

    this.state = {
      size: {
          width,
          height
      },
      email: '',
      password: '',
      birthday: '',
      nickname: '',
      termsAgreed: false,
      maxDate: maxDay(),
      loading: false,
      birthdayErr: false,
      nickErr: false,
      passErr: false,
      emailErr: false,
      termsErr: false,
      registerErr: false,
    };

    this.emailCheck = this.emailCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
    this.nicknameCheck = this.nicknameCheck.bind(this);
    this.birthdayCheck = this.birthdayCheck.bind(this);
    this.termsCheck = this.termsCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    console.log('Will mount Signup1');
  }

  componentDidMount() {
    this.store.setInSignupProcess(true);
    console.log('Signup 1 mounted');
  }

  maxDay = () => {
    const now = new Date();
    const nowYear = now.getFullYear();
    const maxYear = nowYear - 18;

    const maxDate = maxYear.toString() + '-' + now.getMonth().toString() + '-' + now.getDay().toString();
    return maxDate;
  };

  updateTermAgreement = () => {
    this.setState({
      termsErr: false,
      termsAgreed: !this.state.termsAgreed,
      loading: false,
      registerErr: false,
    });
  }

  updateEmail = email => {
    this.setState({
      emailErr: false,
      registerErr: false,
      loading: false,
      email: email.trim(),
    });
  }

  updatePassword = password => {
    this.setState({
      passErr: false,
      registerErr: false,
      loading: false,
      password: password.trim(),
    });
  }

  updateNickname = (nickname) => {
    this.setState({
      registerErr: false,
      nickErr: false,
      loading: false,
      nickname: nickname.trim(),
    });
  }

  updateBirthday = bday => {
    this.setState({
      registerErr: false,
      birthdayErr: false,
      loading: false,
      birthday: bday.trim(),
    });
  }

  emailCheck() {
    if(checkEmail(this.state.email)){
      return true;
    }
    this.setState({
      emailErr: '咦？請再檢查一次email是否正確?',
      loading: false,
    })
    return false;
  }

  passwordCheck() {
    const passw =  /^[A-Za-z0-9]{6,10}$/;
    if(!this.state.password.match(passw))
    {
      this.setState({
        passErr: '請輸入數字或英文字母組合的6~10字密碼',
        loading: false,
      })
      return false;
    }
    return true;
  }

  nicknameCheck() {
    if(this.state.nickname.length < 2) {
      this.setState({
        nickErr: '請輸入2個字以上的名稱',
        loading: false,
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
        loading: false,
      })
      return false;
    }
    // Check age must be 18 and above
    if(getAge(this.state.birthday) < 18) {
      this.setState({
        birthdayErr: '本App僅提供滿18歲以上用戶使用',
        loading: false,
      })
      return false;
    }
    return true;
  }

  termsCheck() {
    if(!this.state.termsAgreed) {
      this.setState({
        termsErr: '您必須先同意所有條款後再使用本App的服務',
        loading: false,
      })
      return false;
    }
    return true;
  }

  handleSubmit() {
    this.setState({loading: true});
    const emailOk = this.emailCheck();
    const passwordOk = this.passwordCheck();
    const nameOk = this.nicknameCheck();
    const bdayOk = this.birthdayCheck();
    const termsOk = this.termsCheck();
    if(emailOk && passwordOk && nameOk && bdayOk && termsOk){
      this.sustore.setBirthday(this.state.birthday);
      this.sustore.setNickname(this.state.nickname);
      this.sustore.setPassword(this.state.password);
      this.sustore.setTermsAgreement(this.state.termsAgreed);
      this.sustore.setEmail(this.state.email);

      // Create a new user on Firebase
      this.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.sustore.setUid(user.uid);
        console.debug({'New user created': user, 'uid': user.uid});
      })
      .then(() => {
        this.setState({
          loading: false,
          registerErr: false,
        });
        // Go to signup step 2
        Actions.signup2({
          sustore: this.sustore
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          registerErr: err.message,
        });
        console.error(err);
      });
    }
  }

  render() {
    const { termsAgreed, email, password, nickname, birthday } = this.state;
    const { maxDate, birthdayErr, emailErr, termsErr, nickErr, passErr, loading, size, registerErr } = this.state;

    return (
      <View style={this.state.size}>
        <Header
          headerText='建立新帳號'
          rightButtonText='下一步'
          onRight={this.handleSubmit}
          rightColor='#007AFF'
          disableRight={this.state.loading}
          disableLeft={this.state.loading}
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        <FormLabel>帳號 Email</FormLabel>
        {
          emailErr &&
          <Text style={styles.errStyle}>
            {emailErr}
          </Text>
        }
        <FormInput
          autoFocus
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
        />
        <FormLabel>密碼</FormLabel>
        {
          passErr &&
          <Text style={styles.errStyle}>
          {passErr}
          </Text>
        }
        <FormInput
          ref='passwrd'
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
        <FormInput
          ref='nickname'
          placeholder='請輸入您的大名(2個字以上)'
          value={nickname}
          onBlur={this.nicknameCheck}
          returnKeyType={'next'}
          maxLength={20}
          onChangeText={nickname => this.updateNickname(nickname)}
        />
        <FormLabel>生日</FormLabel>
        {
          birthdayErr &&
          <Text style={styles.errStyle}>
          {birthdayErr}
          </Text>
        }
        <DatePicker
          style={{alignSelf: 'center', marginTop: 5, width: size.width*0.9}}
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
          style={{ marginTop: 10 }}
          backgroundColor='transparent'
          color='#007AFF'
          title={'下一步'}
          onPress={this.handleSubmit}
          disabled={this.state.loading}
        />
        {
          registerErr &&
          <Text style={styles.errStyle}>
          {registerErr}
          </Text>
        }
        {
          loading && <ActivityIndicator />
        }
      </View>
    );
  }
}

export { Signup1 };
