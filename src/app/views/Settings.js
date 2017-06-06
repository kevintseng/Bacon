import React, {Component, PropTypes} from 'react';
import { View, Dimensions, StyleSheet, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text ,List, ListItem } from 'react-native-elements';

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
    console.log('Rendering Settings');
    Actions.refresh({ key: 'drawer', open: false });
  }

  handleOnPress(key) {
    switch (key) {
      case 'aboutmeeq':
        return () => Actions.aboutmeeq();
      case 'account':
        return () => Actions.account();
      case 'pushnotification':
        return () => Actions.pushnotification();
      case 'question':
        return () => Actions.question();
      case 'feedback':
        return () => Actions.feedback();
    }
  }

  render() {
    return(
        <View style={styles.viewWrapper}>
          <ListItem
            roundAvatar
            title='關於MeeQ'
            onPress={this.handleOnPress('aboutmeeq')}/>
          <ListItem
            roundAvatar
            title='帳號設定'
            onPress={this.handleOnPress('account')}/>
          <ListItem
            roundAvatar
            title='意見反應'
            onPress={this.handleOnPress('feedback')}/>
          <ListItem
            roundAvatar
            title='提示設定'/>
          <ListItem
            roundAvatar
            title='隱身設定'/>
        </View>
    );
  }
}

const styles = {
    viewWrapper: {
      width: width,
      height: height,
      marginTop: 15,
    }
  }
