import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// const sampleImg = require('../images/chiling.jpeg');

const list = [

  {
    title: '邂逅',
    icon: 'face',
    key: 'meetnew'
  },
  {
    title: '巧遇',
    icon: 'explore',
    key: 'nearby'
  },
  {
    title: '訊息',
    icon: 'message',
    key: 'messages',
    new: 1
  },
  {
    title: '喜歡您',
    icon: 'star',
    key: 'likesyou',
    new: 2
  },
  {
    title: '訪客',
    icon: 'visibility',
    key: 'visitors',
    new: 5
  },
  {
    title: '收藏',
    icon: 'favorite',
    key: 'favorites'
  },
  {
    title: '設定',
    icon: 'settings',
    key: 'settings'
  }
];

export default class SideBar extends Component {
  handleImageChange = () => {
    // Do something
    Reactotron.log('handleImageChange pressed.');
    // response looks like : {
    //      data: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // Base64
    //      fileSize: 474486,
    //      height: 531,
    //      isVertical: false,
    //      origURL: "assets-library://asset/asset.JPG?id=106E99A1-4F6A-45A2-B320-B0AD4A8E8473&ext=JPG",
    //      uri: "file:///...",
    //      width: 800,
    // }
  };

  badgeShow = (newCount) => {
    if (newCount > 0) {
      return { value: newCount, badgeContainerStyle: { backgroundColor: 'red' } };
    }
    return false;
  };

  handleOnPress = (key) => {
    switch (key) {
      // case 'meetnew':
      //   return Actions.meetcute({type:'reset'});
      case 'myprofile':
        return Actions.myprofle;
      case 'favorites':
        return Actions.favorites;
      case 'visitors':
        return Actions.visitors;
      case 'likesyou':
        return Actions.likesyou;
      case 'nearby':
        return Actions.signup;
      case 'messages':
        return Actions.messages;
      case 'settings':
        return Actions.settings;
      default:

    }
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: 50,
          height: 600,
        }}
      >
        <List>
          <ListItem
            roundAvatar
            avatar={{ uri: 'https://i.imgur.com/LQvbY0N.jpg' }}
            title={'我是正妹'}
            rightIcon={{ name: 'account-circle' }}
            onPress={this.handleOnPress('myprofile')}
          />
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                underlayColor={'#f8f8f8'}
                title={item.title}
                leftIcon={{ name: item.icon }}
                badge={this.badgeShow(item.new)}
                onPress={this.handleOnPress(item.key)}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}
