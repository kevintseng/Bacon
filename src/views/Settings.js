import React, {Component, PropTypes} from 'react';
import { View, Dimensions, StyleSheet, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text ,List, ListItem } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
//import * as firebase from 'firebase';
// 将 Firebase 的 config 值引入
//import { FirebaseConfig } from '../Configs';
//import AppStore from '../store/AppStore'; // eslint-disable-line



const {width, height} = Dimensions.get('window'); //eslint-disable-line

//const fs = Firebase.initializeApp(FirebaseConfig);
@observer
export default class Settings extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }



  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      size: {
          width,
          height
      },
      //dataSource: ds.cloneWithRows(['row 1', '' ,'row 3','row 4']),
    };
  }

  componentWillMount() {
    Reactotron.log('Rendering Settings');
    Actions.refresh({ key: 'drawer', open: false });
  }

  handleOnPress(key) {
    switch (key) {
      case 'account':
        return () => Actions.account({type: 'push'});
      case 'pushnotification':
        return () => Actions.pushnotification({type: 'push'});
      case 'question':
        return () => Actions.question({type: 'push'});
    }
  }




  render() {
    return(
      <List>
        <ListItem
          roundAvatar
          title='帳號管理'
          //onPress={()=> {Actions.Account({type: 'reset'})}}
          onPress={this.handleOnPress('account')}
        />

        <ListItem
          roundAvatar
          title='推播通知'
          onPress={this.handleOnPress('pushnotification')}
        />

        <ListItem
          roundAvatar
          title='常見問題'
          onPress={this.handleOnPress('question')}
        />

        <ListItem
          roundAvatar
          title='意見反應'
        />

        <ListItem
          roundAvatar
          title='版本資訊'
        />

        <ListItem
          roundAvatar
          title='版權聲明'
        />

        <ListItem
          roundAvatar
          title='隱私權聲明'
        />

        <ListItem
          roundAvatar
          title='使用條款'
        />

      </List>

    );
  }




}

const styles = {
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
  }
