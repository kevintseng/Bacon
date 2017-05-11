import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';

import { List, ListItem, Button, Badge } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { SIDEBAR_LINKS } from '../Configs';

const { height } = Dimensions.get('window'); //eslint-disable-line

const list = SIDEBAR_LINKS;
const loading = require('../images/loading.gif');

const styles = {
  containerStyle: {
    borderBottomWidth: 0,
  },
  wrapperStyle: {
    paddingLeft: 10,
  },
  leftIconStyle: {
    marginRight: 3,
  },
};

@observer
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
  }

  componentWillMount() {
    console.log('Rendering SideBar.');
  }

  componentDidMount() {
    console.log('SideBar rendered.');
  }

  handleImageChange = () => {
    // Do something
    console.log('handleImageChange pressed.');
  };

  badgeShow = (newCount) => {
    if (newCount > 0) {
      return {
        element: <Badge containerStyle={{ backgroundColor: '#f44336' }} value={newCount} />
      };
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
    // const timestamp = Math.floor(Date.now() / 1000);
    this.firebase.database().ref('/online/' + uid).remove();
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
      // Go to profile view only when user data is loaded.
        if(this.store.user != null && this.store.user != '') {
          return () => Actions.profile({type: 'reset'});
        }
        return () => {};
    }
  }

  render() {

    let displayName, photoURL;
    if(this.store.user != null && this.store.user != '') {
      displayName = this.store.user.displayName;
      photoURL = { uri: this.store.user.photoURL };
    } else {
      displayName = '載入中...';
      photoURL = loading;
    }

    console.log('Height: ' + height);

    return (
      <ScrollView
        style={{
          height,
          backgroundColor: '#F5F5F5'
        }}
      >
        <List>
          <ListItem
            containerStyle={{ height: 43, backgroundColor: '#F5F5F5', borderBottomWidth: 0.5, borderBottomColor: '#BDBDBD'}}
            rightIcon={{ name: 'menu', color: 'black' }}
            onPress={() => Actions.refresh({ key: 'drawer', open: false })}
          />
          <ListItem
            roundAvatar
            containerStyle={styles.containerStyle}
            avatar={ photoURL }
            title={ displayName }
            onPress={this.handleOnPress('profile')}
          />
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                containerStyle={styles.containerStyle}
                underlayColor={'#f8f8f8'}
                title={item.title}
                leftIcon={{ name: item.icon, style: styles.leftIconStyle }}
                badge={this.badgeShow(item.new)}
                onPress={this.handleOnPress(item.key)}
              />
            ))
          }
        </List>
        <Button
          style={{ marginTop: 10 }}
          color={'black'}
          backgroundColor={'#F5F5F5'}
          title={'登出'}
          onPress={this.signOut}
        />
      </ScrollView>
    );
  }
}
