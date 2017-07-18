import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { FormInput, CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';


//import { observer } from 'mobx-react/native';
// import { autorun } from 'mobx';
 // eslint-disable-line
//import { Header, FormErrorMsg } from '../../components';
//import SignupStore from '../../../mobx/stores/SignupStore'


export default class Step3 extends Component {


  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      nickname: ''
    }
  }

  onPressNextButton = () => {
    Actions.Step4()
  }


  render(){
    return(
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 20}}>

        <View>
          <Image source={require('../../../images/ico_titlebar_logo.png')} />
        </View>

      <View style={{alignItems: 'center', paddingBottom: 15}}>
        <View>
          <Image source={require('../../../images/ico_reg_mail.png')}/>
        </View>
        <View style={{paddingBottom: 15}}>
          <FormInput
            underlineColorAndroid="#ff0000"
            autoFocus
            autoCorrect={false}
            placeholder='sample@email.com'
            returnKeyType={'next'}
            keyboardType={'email-address'}
            value={this.state.email}
            maxLength={60}
            onChangeText={()=>{}}
          />
        </View>
        <View>
          <Image source={require('../../../images/ico_logo_pass.png')}/>
        </View>
        <View>
          <FormInput
            ref='passw'
            placeholder='請輸入密碼'
            secureTextEntry
            maxLength={12}
            value={this.state.password}
            onChangeText={()=>{}}
            />
        </View>
        <View>
          <Image source={require('../../../images/ico_logo_nn.png')}/>
        </View>
        <View>
          <FormInput
            ref='nickname'
            placeholder='請輸2個字以上的暱稱)'
            onBlur={this.nicknameCheck}
            returnKeyType={'next'}
            maxLength={20}
            value={this.state.nickname}
            onChangeText={()=>{}}
            />
        </View>
        <View>
          <Image source={require('../../../images/ico_logo_bd.png')}/>
        </View>
        <View>
          <DatePicker
            //style={{alignSelf: 'center', marginTop: 5, width: size.width*0.9}}
            date={this.state.birthday}
            mode="date"
            placeholder="您的生日"
            format="YYYY-MM-DD"
            minDate="1950-01-01"
            maxDate="2015-01-01"
            confirmBtnText="完成"
            cancelBtnText="取消"
            showIcon={false}
            onDateChange={()=>{}}
          />
        </View>
      </View>

        <View style={{flexDirection:'row'}}>
          <View>
            <CheckBox
            //title = 'ddd'
              //containerStyle={{maxWidth:70,backgroundColor:'white',borderColor:'white',borderWidth:0}}
              //onBlur={this.termsCheck}
              checked={false}
              onPress={()=>{}}
            />
          </View>
          <View>
            <Text>我同意</Text>
            <Text>Bacon隱私權政策</Text>
            <Text>及</Text>
            <Text>服務條款</Text>
          </View>

        </View>


        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={this.onPressNextButton}> 
            <Image style={{justifyContent: 'center'}} source={require('../../../images/btn_gredient.png')}>
              <Text style={{fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>下一步</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View>
          <Image source={require('../../../images/pic_index_wave.png')} />
        </View>
      </View>
    )
  }
}
 
