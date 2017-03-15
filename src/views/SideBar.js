import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { SIDEBAR_LINKS } from '../Configs';

const list = SIDEBAR_LINKS;

@observer
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
  }

  componentWillMount() {
    Reactotron.log('Rendering SideBar.');
    // Reactotron.log(this.store);
  }

  componentDidMount() {
    Reactotron.log('SideBar rendered.');
    // Reactotron.log(this.store);
  }


  handleImageChange = () => {
    // Do something
    Reactotron.log('handleImageChange pressed.');
  };

  badgeShow = (newCount) => {
    if (newCount > 0) {
      return { value: newCount, badgeContainerStyle: { backgroundColor: 'red' } };
    }
    return false;
  };

  signOut = () => {
    // Clear out appstore's user data
    if(this.store.user) {
      this.setOffline(this.store.user.uid);
      this.store.signOut();
    }

    // Sign out from firebase
    this.firebase.auth().signOut();

    // Clear out local database's user data
    this.db.remove({
      key: 'user',
    });

    // Render SessionCheck and redirect to signin view
    Actions.sessioncheck({type: 'reset'});
  }

  setOffline(uid) {
    const timestamp = Math.floor(Date.now() / 1000);
    const dbRef = this.firebase.database().ref('/connections/' + uid);
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
        return () => Actions.settings_wrapper({type: 'reset'});
      case 'profile':
        return () => Actions.profile({type: 'reset'});
    }
  }

  render() {

    let displayName, photoURL;
    if(this.store.user != null && this.store.user != '') {
      displayName = this.store.user.displayName;
      photoURL = this.store.user.photoURL;
    } else {
      displayName = 'Loading..';
      photoURL = 'https://placeholder.it/150x150'
    }

    return (
      <ScrollView
        style={{
          height: 800,
        }}
      >
        <List>
          <ListItem
            containerStyle={{ height: 42 }}
            rightIcon={{ name: 'first-page' }}
            rightTitle='Close'
            rightTitleStyle={{ color: '#616161' }}
            onPress={() => Actions.refresh({ key: 'drawer', open: false })}
          />
          <ListItem
            roundAvatar
            avatar={{ uri: photoURL }}
            title={ displayName }
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
