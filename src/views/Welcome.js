import React, { Component } from 'react';
import {
    View,
    Dimensions, Image
} from 'react-native';
import { Text, FormLabel, FormInput, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { observer } from 'mobx-react/native';
import { FormErrorMsg } from '../components';
import { checkEmail } from '../Utils';

const { width, height } = Dimensions.get('window');
const styles = {
  redback:{
    backgroundColor: '#222222'
  },
  blueback:{
    backgroundColor: 'blue'
  }
};

@observer
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.state = {
      size: {
        width,
        height
      },
      email: '',
      password: '',
      emailErr: false,
      loginErr: false,
      loading: false,
    };
  }


  render() {
    return (
      /*
      <Grid>
        <Row size={3} style={{backgroundColor: 'white', flex: 2, alignSelf:'center',justifyContent:'center'}}>
          <Image
            style={{maxWidth:280, maxHeight: 100}}
            source={require('../images/MeeqLogo.png')}
          />
          <Text h4>最懂你的交友 APP</Text>
        </Row>
        <Row></Row>
      </Grid>
      */
      <Grid>
        <Row size={2} style={{borderWidth: 0 , borderColor: 'red',alignSelf:'center'}}>
          <View style={{flexDirection: 'column', alignSelf:'center'}}>
            <Image
              style={{maxWidth:280, maxHeight: 100}}
              source={require('../images/MeeqLogo.png')}
            />
            <Text h4 style={{alignSelf:'center'}}>最懂你的交友 APP</Text>
          </View>


        </Row>
        <Row size={1} style={{flexDirection: 'column',borderWidth: 0 , borderColor: 'blue'}}>
          <View>
            <Button
              large
              raised
              backgroundColor='#FECE00'
              title='免費加入'
              onPress={Actions.tempsignup} />
            <View style={{height:10}}></View>
            <Button
              large
              raised
              backgroundColor='#03A9F4'
              title='登入'
              onPress={Actions.tempPage} />
              <View style={{height:0}}></View>
              <Button
                title='忘記密碼? 申請密碼重設'
                color='grey'
                backgroundColor='transparent'
                onPress={Actions.forgot}
              />
          </View>
        </Row>
      </Grid>

    );
  }
}
