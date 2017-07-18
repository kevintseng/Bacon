import React, {Component} from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
//import UserAvatar from 'react-native-user-avatar';

//import { Actions } from 'react-native-router-flux';
//import { observer } from 'mobx-react/native';
// import { autorun } from 'mobx';
 // eslint-disable-line
//import { Header, FormErrorMsg } from '../../components';
//import SignupStore from '../../../mobx/stores/SignupStore'

const { width } = Dimensions.get('window'); //eslint-disable-line

const picWidth = width/2

export default class Step4 extends Component {
  render(){
    return(
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',marginTop: 20}}>

        <View>
          <Image source={require('../../../images/ico_titlebar_logo.png')} />
        </View>

        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={this.onPressNextButton}> 
            <Image style={{justifyContent: 'center'}} source={require('../../../images/btn_index_join.png')}>
              <Text style={{fontSize: 20, color: '#606060', textAlign: 'center', fontWeight: 'bold'}}>+新增個人照片一張</Text>
            </Image>
          </TouchableOpacity>
        </View>

        <View>
          <Image 
            style={{ alignSelf: 'center', marginBottom: 10, width: picWidth, height: picWidth, borderRadius: picWidth }}
            source={require('../../../images/avatar.jpg')}       
          />

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
 
