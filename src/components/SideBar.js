import React, { Component, PropTypes } from 'react';
import { ScrollView, AsyncStorage, View } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { SIDEBAR_LINKS } from '../Configs';

// const sampleImg = require('../images/chiling.jpeg');

const list = SIDEBAR_LINKS;

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

  componentWillMount() {
    Reactotron.debug('Rendering SideBar');
  }


  handleImageChange = () => {
    // Do something
    Reactotron.debug('handleImageChange pressed.');
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

  signOut = async () => {
    try {
      this.setOffline(this.store.user.uid);
      await this.fs.auth().signOut();
      AsyncStorage.getItem('@HookupStore:user').then( user => {
        if(user != null) {
          AsyncStorage.removeItem('@HookupStore:user').then(() => {
            this.store.signOut();
            Actions.sessioncheck({type: 'reset'});
          }).catch(err => {
            Reactotron.error('Delete local storage user data error: ');
            Reactotron.error(err);
          });
        } else {
          this.store.signOut();
          Actions.sessioncheck({type: 'reset'});
        }
      }).catch(err => {
        Reactotron.error('Get local storage user data error: ');
        Reactotron.error(err);
      });
    } catch (error) {
      Reactotron.error('Firebase signout error: ');
      Reactotron.error(error);
    }
  };

  setOffline(uid) {
    const timestamp = Math.floor(Date.now() / 1000);
    let dbRef = this.fs.database().ref('/connections/' + uid);
    dbRef.update({
      online: false,
      lastOnline: timestamp,
    });
  }

  handleOnPress(key) {
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
      case 'profile':
          return () => Actions.profile({type: 'reset'});
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
            containerStyle={{ height: 42 }}
            hideChevron
            leftIcon={{ name: 'chevron-left' }}
            title='關閉選單'
            onPress={() => Actions.refresh({ key: 'drawer', open: false })}
          />
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
          onPress={this.signOut}
        />
      </ScrollView>
    );
  }
}
