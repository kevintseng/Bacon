//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import Moment from 'moment';
import { BasicInfo } from './BasicInfo';
import AccountStatus from './AccountStatus';


const ADD_IMAGE = require('../../images/addImage.png');

const {width} = Dimensions.get('window');
const styles = {
  viewWrapper: {
    width,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      margin: 0,
      padding: 0,
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

@observer
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.storage = this.props.storage;
    this.state = {
      editBasicInfo: false,
      message: '',
      visible: false,
      tip: null,
      items: [{ id: 'addImage', src: ADD_IMAGE }],
    };
  }

  componentDidMount() {
    Reactotron.log('Profile rendered');
    Actions.refresh({ key: 'drawer', open: false });
    // Build an array of 60 photos
  }

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  getAge = (dob) => {
    return Moment().diff(dob, 'years');
  }

  getGender = (gender) => {
    if(gender === 'm') {
      return '男';
    }
    if(gender === 'f') {
      return '女';
    }
  }

  handleEditBasicInfo = () => {
    this.setState({
      editBasicInfo: true,
    })
  }

  handleSaveBasicInfo = () => {
    this.setState({
      editBasicInfo: false,
    })
  }

  handleUpgrade = () => {
    this.setState({
      visible: true,
      message: '會員升級鈕'
    });
    Reactotron.log('upgrade button pressed');
  }

  handleAddCredit = () => {
    this.setState({
      visible: true,
      message: '儲值鈕'
    });
    Reactotron.log('addCredit button pressed');
  }

  render() {
    const user = this.store.user;
    const age = this.getAge(user.birthday);
    const gender = this.getGender(user.gender);
    // const userImg = {uri: user.photoURL};
    return(
      <ScrollView>
        <BasicInfo
          displayName={user.displayName}
          location={user.city}
          avatar={user.photoURL}
          handleEditBasicInfo={this.handleEditBasicInfo}
          />
        <AccountStatus
          upgrade={this.handleUpgrade}
          addCredit={this.handleAddCredit}
          />
        <Card
          wrapperStyle={styles.viewWrapper}
          containerStyle={styles.container}
          >
          <ListItem
            key='email'
            title='Email 認證'
            rightTitle='重寄認證信'
            rightTitleStyle={{ color: '#2962FF' }}
            hideChevron
            subtitle='未完成'
            />
            <FormLabel>自我介紹</FormLabel>
            <FormInput
              multiline
              maxLength={25}
              value={'我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......'}

              onChangeText={() => {}}
              />
            <FormValidationMessage>Error message</FormValidationMessage>
          <ListItem
            key='hobby'
            title='興趣愛好'
            rightIcon={{name: 'mode-edit', color: '#2962FF'}}
            subtitle='我的興趣是....我的興趣是....我的興趣是....'
            />
          <ListItem
            key='language'
            title='語言能力'
            rightIcon={{name: 'mode-edit', color: '#2962FF'}}
            subtitle='中文, 英文'
            />
          <ListItem
            key='photoVerified'
            rightIcon={{name: 'chevron-right', color: '#2962FF'}}
            title='照片認證'
            rightTitle='進行認證'
            rightTitleStyle={{ color: '#2962FF' }}
            hideChevron
            subtitle='未完成'
            />
        </Card>
      </ScrollView>
    );
  }
}
