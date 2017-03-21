//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, Icon, Text, ListItem } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import Reactotron from 'reactotron-react-native';
import Moment from 'moment';

const ADD_IMAGE = require('../../images/addImage.png');

const {width, height} = Dimensions.get('window');
const styles = {
  viewWrapper: {
    width,
  },
  container: {
      flex: 1,
      flexDirection: 'row',
  },
  gallery: {
      flexDirection: 'row'
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  photo: {
      flex: 1
  }
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
      <ScrollView style={styles.viewWrapper}>
        <Card
          containerStyle={{ flex: 1, width: this.state.size.width, margin: 0 }}
          wrapperStyle={{ flex: 1 }}
          image={{ uri: user.photoURL }}
          imageStyle={{ resizeMode: 'cover' }}
          >

          <View style={{ height: 70, paddingHorizontal: 5, flex:0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#3F51B5' }}>
            <View style={{ width: 100, flex:0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 15, color: '#E0E0E0' }}>一般</Text>
                <Text style={{ fontSize: 15, color: '#E0E0E0' }}>會員</Text>
              </View>
              <TouchableOpacity
                style={{ marginLeft: 10, flex: 0, alignItems: 'center' }}
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
            <View style={{ width: 100, flex:0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', justifyContent:'space-between' }}>
                <Text style={{ fontSize: 15, color: 'white' }}>點數</Text>
                <Text style={{ fontSize: 10, color: 'yellow' }}>35,000</Text>
              </View>
              <TouchableOpacity
                style={{ marginLeft: 10, flex: 0, alignItems: 'center' }}
                onPress={() => {
                  this.setState({
                    visible: true,
                    message: '儲值鈕'
                  });
                }}>
                <Icon name='redeem' color='#EEEEEE'/>
                <Text style={{ fontSize: 10, color: '#E0E0E0' }}>儲值</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ListItem
            key='name'
            title={user.displayName}
            subtitle={`${this.getGender(user.gender)}, ${this.getAge(user.birthday)}, ${user.city}`}
            hideChevron
            />
          <ListItem
            key='email'
            title='Email認證'
            rightTitle='馬上認證'
            rightTitleStyle={{ color: '#2962FF' }}
            subtitle='未認證'
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
            rightTitle='馬上認證'
            rightTitleStyle={{ color: '#2962FF' }}
            subtitle='未認證'
            />
        </Card>
      </ScrollView >
    );
  }
}
