import React, { Component, PropTypes } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';

// const sampleImg = require('../images/chiling.jpeg');

const list = [

  {
    title: '邂逅',
    icon: 'face',
    key: 'meetcute',
  },
  {
    title: '巧遇',
    icon: 'explore',
    key: 'nearby',
  },
  {
    title: '訊息',
    icon: 'message',
    key: 'messages',
    new: 1,
  },
  {
    title: '喜歡您',
    icon: 'star',
    key: 'likesyou',
    new: 2,
  },
  {
    title: '訪客',
    icon: 'visibility',
    key: 'visitors',
    new: 5,
  },
  {
    title: '收藏',
    icon: 'favorite',
    key: 'favorites'
  },
  {
    title: '設定',
    icon: 'settings',
    key: 'settings',
  }
];

@observer
export default class SideBar extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.object,
  }



  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    // this.handleOnPress = this.handleOnPress.bind(this);
  }

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

  signout = () => {
    AsyncStorage.removeItem('userData').then(() => {
      this.store.signOut();
      this.fs.auth.signOut().then(() => {
        Actions.sessioncheck({type: 'reset'});
      });
    });
  };

  handleOnPress(key) {
    Reactotron.log(key);
    switch (key) {
      case 'meetcute':
        return () => Actions.meetcute({type: 'reset'});
      case 'nearby':
        return () => Actions.nearby({type: 'reset'});
      case 'favorites':
        return () => Actions.favorites({type: 'reset'});
      case 'visitors':
        return () => Actions.visitors({type: 'reset'});
      case 'likesyou':
        return () => Actions.likesyou({type: 'reset'});
      case 'messages':
        return () => Actions.messages({type: 'reset'});
      case 'settings':
        return () => Actions.settings({type: 'reset'});
    }
  }

  render() {
    return (
      <ScrollView
        style={{
          height: 800,
        }}
      >
        <List>
          <ListItem
            roundAvatar
            avatar={{ uri: 'https://i.imgur.com/LQvbY0N.jpg' }}
            title={'我是正妹'}
            rightIcon={{ name: 'account-circle' }}
            onPress={this.handleOnPress('profile')}
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
        <Button
          style={{ marginTop: 10 }}
          backgroundColor='transparent'
          color='#007AFF'
          title={'登出'}
          onPress={this.signout}
        />
      </ScrollView>
    );
  }
}
