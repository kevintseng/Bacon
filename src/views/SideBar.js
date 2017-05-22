import React from 'react'
import { ScrollView, Dimensions } from 'react-native'

import { List, ListItem } from 'react-native-elements'
//import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react/native'
import { SIDEBAR_LINKS } from '../Configs'

const loading = require('../images/loading.gif')
const { height } = Dimensions.get('window') //eslint-disable-line
const list = SIDEBAR_LINKS
const styles = {
  scrollView: {
    height,
    backgroundColor: '#ffffff'
  },
  listContainerStyle:{
    marginTop: 0,
    borderBottomWidth: 0,
    backgroundColor: '#ffffff'
  },
  listItemContainerStyle: {
    borderBottomWidth: 0,
    //backgroundColor: '#f0f0f0'
  },
  wrapperStyle: {
    paddingLeft: 43,
  }
};

@observer
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
    this.state = {
      displayName: '載入中...',
      photoURL: loading
    };
    console.log('-----store-----')
    console.log(this.store.user);
  }

  componentWillMount() {
    console.log('Rendering SideBar.');
  }
}


  componentDidMount() {
    console.log('SideBar rendered.');
    if(this.store.user != 'undefined' && this.store.user != '') {
      //displayName = this.store.user.displayName;
      //photoURL = this.store.user.photoURL;
      this.setState({
        displayName: this.store.user.displayName,
        photoURL: this.store.user.photoURL
      })
    };
  }

  handleImageChange = () => {
    // Do something
    console.log('handleImageChange pressed.');
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

    var displayName, photoURL;
    if(this.store.user != 'undefined' && this.store.user != '') {
      displayName = this.store.user.displayName;
      photoURL = this.store.user.photoURL;
    } else {
      displayName = '載入中...';
      photoURL = loading;
    }


    console.log('Height: ' + height);

const SideBar = observer(({ store }) => {

  const { scrollView, listContainerStyle, listItemContainerStyle, wrapperStyle } = styles


  return(
    <ScrollView style = { scrollView } >
      <List containerStyle = { listContainerStyle } >
        <ListItem
            containerStyle = { [listItemContainerStyle,{height: 53, borderBottomWidth: 0.5, borderBottomColor: '#808080'}] }
            rightIcon = {{name: 'menu', color: 'black'}}
            onPress = { store.refreshDrawer }
        />
        <ListItem
            roundAvatar
            containerStyle={styles.containerStyle}
            avatar={{uri:photoURL}}
            title={displayName}
            onPress={this.handleOnPress('profile')}
          />
        {
          list.map((item, i) => (
              <ListItem
                key = { i }
                containerStyle = { listItemContainerStyle }
                wrapperStyle = { wrapperStyle }
                underlayColor = { '#f8f8f8' }
                title = { item.title }
                leftIcon = {{name: item.icon}}
                badge = { false }
                onPress = { store.handleOnPress(item.key) }
              />
          ))
        }
      </List>
    </ScrollView>
  )
 }
)

export { SideBar }
