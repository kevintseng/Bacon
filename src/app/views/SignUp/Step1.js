import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
//import { inject } from "mobx-react"

//import { observer } from 'mobx-react/native';
// import { autorun } from 'mobx';
//import { Header, FormErrorMsg } from '../../components';
//import SignupStore from '../../../mobx/stores/SignupStore'

export default class Step1 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sexSource: true,
      intentSource: true
    }
  }

  onPressSexButton = () => {
    this.setState({
      sexSource: !this.state.sexSource
    })
  }

  onPressIntentButton = () => {
    this.setState({
      intentSource: !this.state.intentSource
    })
  }

  onPressNextButton = () => {
    Actions.Step2()
  }

  onPressReturnButton = () => {
    Actions.pop()
  }

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent:'center', marginLeft: 20}}>
            <TouchableOpacity activeOpacity={0.2} onPress={this.onPressReturnButton}>
              <Image source={require('../../../images/btn_back.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent:'center', marginRight: 20}}>
            <Image source={require('../../../images/ico_titlebar_logo.png')} />
          </View>
        </View>

        <View style={{marginTop: 70}}>
          <TouchableOpacity activeOpacity={0.2} onPress={this.onPressSexButton}>
            <Image style={{justifyContent: 'center'}} source={this.state.sexSource ? require('../../../images/switcher_reg_sex_1.png') : require('../../../images/switcher_reg_sex_2.png')}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{fontSize: 20, color: this.state.sexSource ? 'white': '#606060'}}>我是男的</Text>
                <Text style={{fontSize: 20, color: this.state.sexSource ? '#606060' : 'white'}}>我是女的</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity activeOpacity={0.2} onPress={this.onPressIntentButton}>
            <Image style={{justifyContent: 'center'}} source={this.state.intentSource ? require('../../../images/switcher_reg_homo_1.png') : require('../../../images/switcher_reg_homo_2.png')}>
             <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={{fontSize: 20, color: this.state.intentSource ? 'white': '#606060'}}>喜歡同性</Text>
                <Text style={{fontSize: 20, color: this.state.intentSource ? '#606060' : 'white'}}>喜歡異性</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 70}}>
          <Text style={{color: '#606060'}}>提醒：請注意性別與性向是不能更改的</Text>
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