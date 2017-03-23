//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, Icon, Text, ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import Moment from 'moment';
import { BasicInfoEditMode } from './BasicInfo';

const ADD_IMAGE = require('../../images/addImage.png');

const {width, height} = Dimensions.get('window');
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
      size: {
          width,
          height
      },
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

  render() {
    const user = this.store.user;
    // const userImg = {uri: user.photoURL};
    return(
      <ScrollView>
        <Card
          wrapperStyle={styles.viewWrapper}
          containerStyle={styles.container}
          >
          <BasicInfoEditMode />
          <ListItem
            key='name'
            title={user.displayName}
            subtitle={`${this.getGender(user.gender)}, ${this.getAge(user.birthday)}, ${user.city}`}
            roundAvatar
            avatar={{ uri: user.photoURL }}
            avatarStyle={{ width: 70, height: 70 }}
            rightIcon={{name: 'mode-edit', color: '#2962FF'}}
            />
          <View style={{ height: 45, paddingHorizontal: 80, flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FF6F00' }}>
            <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 14, color: 'white' }}>一般</Text>
                <Text style={{ fontSize: 14, color: 'white' }}>會員</Text>
              </View>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    this.setState({
                      visible: true,
                      message: '會員升級鈕'
                    });
                }}>
                <Icon name='star' color='#EEEEEE'/>
                <Text style={{ fontSize: 10, color: 'white' }}>升級</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 60 }}/>
            <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <View style={{ marginTop: 4 }}>
                <Text style={{ fontSize: 14, color: 'white' }}>點數</Text>
                <Text style={{ fontSize: 14, color: 'yellow' }}>3,237</Text>
              </View>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setState({
                    visible: true,
                    message: '儲值鈕'
                  });
                }}>
                <Icon name='redeem' color='#EEEEEE'/>
                <Text style={{ fontSize: 10, color: 'white' }}>儲值</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ListItem
            key='email'
            title='Email 認證'
            rightTitle='重寄認證信'
            rightTitleStyle={{ color: '#2962FF' }}
            hideChevron
            subtitle='未完成'
            />
          <ListItem
            key='bio'
            title='自我介紹'
            rightIcon={{name: 'mode-edit', color: '#2962FF'}}
            subtitle='我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......我是一個......'
            />
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
      </ScrollView >
    );
  }
}
