import React, {Component, PropTypes} from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
} from 'react-native';
import {CheckBox, FormLabel, FormInput, Button} from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Reactotron from 'reactotron-react-native';
import { observer } from 'mobx-react/native';
import { getAge, checkEmail } from '../../components/Utils';
import { Header } from '../../components/Header';
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
  let maxDate = year.toString() + '-' + month.toString() + '-' + day;
  // let temp = new Date(maxDate);
  // Reactotron.debug({'now': today.toString(), 'month': month, 'date': day, 'maxDate': maxDate, 'timestamp': temp.getTime()/1000});
  return maxDate;
}

@observer
export class Signup1 extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.sustore = new SignupStore();
    this.state = {
      size: {
          width,
          height
      },
      email: 'test20@20.com',
      password: '123456',
      birthday: '1989-09-09',
      nickname: 'test20',
      termsAgreed: true,
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

  maxDay = () => {
    const now = new Date();
    const nowYear = now.getFullYear();
    const maxYear = nowYear - 18;

    let maxDate = maxYear.toString() + '-' + now.getMonth().toString() + '-' + now.getDay().toString();
    return maxDate;
  };

  updateTermAgreement = () => {
    this.setState({
      termsErr: false,
      termsAgreed: !this.state.termsAgreed,
      registerErr: false,
    });
  }

  updateEmail = email => {
    this.setState({
      emailErr: false,
      registerErr: false,
      email: email.trim(),
    });
  }

  updatePassword = password => {
    this.setState({
      passErr: false,
      registerErr: false,
      password: password.trim(),
    });
  }

  updateNickname = (nickname) => {
    this.setState({
      registerErr: false,
      nickErr: false,
      nickname: nickname.trim(),
    });
  }

  updateBirthday = bday => {
    this.setState({
      registerErr: false,
      birthdayErr: false,
      birthday: bday.trim(),
    });
  }

  emailCheck() {
    if(checkEmail(this.state.email)){
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
      this.fs.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.sustore.setUid(user.uid);
        Reactotron.debug({'New user created': user, 'uid': user.uid});
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
        Reactotron.error(err);
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
        />
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