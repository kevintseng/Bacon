import React, {Component} from 'react';
import {CheckBox, FormLabel, FormInput, Button} from 'react-native-elements';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { observer } from 'mobx-react/native';
import { getAge, checkEmail } from '../../Utils';
import { Header } from '../../components';
import SignupStore from '../../store/SignupStore'
import Modal from 'react-native-modal'
import {serviceRule, securityRule} from '../../views/data/Rules.js'

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const styles = {
  errStyle: {
    marginLeft: 20,
    color: 'red',
    fontSize: 12
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: 400
  },
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
class Signup3 extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    //this.sustore = new SignupStore();
    console.log(this.firebase);
    this.sustore = this.props.sustore;
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
      visibleModal: null,
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

  emailCheck = async() => {
    if(checkEmail(this.state.email)){
      await this.firebase.database().ref('users/').orderByChild('email').equalTo(this.state.email.toString().toLowerCase().trim()).once("value", (data) => {
        console.log(this.state.email.toString().toLowerCase().trim());
        if(data.val() == null){
          console.log(data.val());
          console.log('Account is OK');
          return true;
        }else{
          console.log('Account is already');
          this.setState({
            emailErr: '此Email已註冊',
            loading: false,
          })
          return false;
        }
      });
    }else {
      this.setState({
        emailErr: '咦？請再檢查一次email是否正確?',
        loading: false,
      })
      return false;
    };
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

  handleSubmit = async() => {
    console.log(this.firebase)
    this.setState({loading: true});
    const emailOk = this.emailCheck();
    const passwordOk = this.passwordCheck();
    const nameOk = this.nicknameCheck();
    const bdayOk = this.birthdayCheck();
    const termsOk = this.termsCheck();


    if(emailOk && passwordOk && nameOk && bdayOk && termsOk){
      this.sustore.setBirthday(this.state.birthday);
      this.sustore.setNickname(this.state.nickname);
      this.sustore.setPassword(this.state.password.trim());
      this.sustore.setTermsAgreement(this.state.termsAgreed);
      this.sustore.setEmail(this.state.email.toString().toLowerCase().trim());
      /*
      Actions.tempsignup4({
        sustore: this.sustore
      });
      */

      // Create a new user on Firebase

      await this.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
        Actions.signup4({
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

  };

  accountCheck() {
    console.log(this.firebase);

    this.firebase.database().ref('users/').orderByChild('email').equalTo('Frank428p@gmail.com').on("value", (data) => {
      if(data.val() == null){
        console.log(data.val());
        console.log('Account is OK');
      }else{
        console.log('Account is already')
      }
    });
  };

  _renderButton = (text, onPress) => (

    <TouchableOpacity onPress={onPress}>
      <View>
        <Text style={{fontWeight:'bold',textDecorationLine:'underline'}}>{text}</Text>
      </View>
    </TouchableOpacity>

  );

  _renderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
        <Text style={{fontWeight:'bold'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderServiceContent = () => (
    <View style={styles.modalContent}>
      <Text style={{fontSize:14,marginBottom:10}}>{serviceRule.title}</Text>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginBottom:5}}></View>
        <ScrollView>
          <Text style={{fontSize:10}}>{serviceRule.context}</Text>
        </ScrollView>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginTop:5}}></View>
      {this._renderCloseButton('我知道了', () => this.setState({ visibleModal: null }))}
    </View>
  );

  _renderSecurityContent = () => (
    <View style={styles.modalContent}>
      <Text style={{fontSize:14,marginBottom:10}}>{securityRule.title}</Text>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginBottom:5}}></View>
      <ScrollView>
        <Text style={{fontSize:10}}>{securityRule.context}</Text>
      </ScrollView>
      <View style={{borderBottomWidth: 1,borderBottomColor: 'gray', width:width*0.8,marginTop:5}}></View>
      {this._renderCloseButton('我知道了', () => this.setState({ visibleModal: null }))}
    </View>
  );



  render() {
    const { termsAgreed, email, password, nickname, birthday } = this.state;
    const { maxDate, birthdayErr, emailErr, termsErr, nickErr, passErr, loading, size, registerErr } = this.state;

    return (
      <View style={this.state.size}>
        <Header
          headerImage
          //rightButtonText='下一步'
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
        <View style={{flexDirection:'row'}}>
        <CheckBox
          containerStyle={{maxWidth:70,backgroundColor:'white',borderColor:'white',borderWidth:0}}
          onBlur={this.termsCheck}
          checked={termsAgreed}
          onPress={this.updateTermAgreement}
        />
          <View style={{paddingTop:20,flexDirection:'row'}}>
            <Text>我同意MeeQ</Text>
            {this._renderButton('隱私權政策', () => this.setState({ visibleModal: 1 }))}
            <Text>及</Text>
            {this._renderButton('服務條款', () => this.setState({ visibleModal: 2 }))}
          </View>
        </View>
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
          title={'最後一步'}
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



       <Modal isVisible={this.state.visibleModal === 1}>
         {this._renderSecurityContent()}
       </Modal>
       <Modal isVisible={this.state.visibleModal === 2}>
         {this._renderServiceContent()}
       </Modal>

      </View>
    );
  }
}

export { Signup3 };
