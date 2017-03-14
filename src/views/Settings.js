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
        return () => Actions.account();
      case 'pushnotification':
        return () => Actions.pushnotification();
      case 'question':
        return () => Actions.question();
      case 'reaction':
        return () => Actions.reaction();
    }
  }




  render() {
    return(
        <View style={styles.viewWrapper}>

          <ListItem
            roundAvatar
            hideChevron
            title='帳號管理'
            //onPress={()=> {Actions.Account({type: 'reset'})}}
            onPress={this.handleOnPress('account')}
          />

          <ListItem
            roundAvatar
            hideChevron
            title='推播通知'
            onPress={this.handleOnPress('pushnotification')}
          />

          <ListItem
            roundAvatar
            hideChevron
            title='常見問題'
            onPress={this.handleOnPress('question')}
          />

          <ListItem
            //roundAvatar
            hideChevron
            title='意見反應'
            onPress={this.handleOnPress('reaction')}
          />

          <ListItem
            roundAvatar
            hideChevron
            title='版本資訊'
          />

          <ListItem
            roundAvatar
            hideChevron
            title='版權聲明'
          />

          <ListItem
            roundAvatar
            hideChevron
            title='隱私權聲明'
          />

          <ListItem
            roundAvatar
            hideChevrons
            title='使用條款'
          />


        </View>




    );
  }




}

const styles = {
    subtitleView: {
      paddingTop: 0,
      marginTop: 0
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    },
    viewWrapper: {
      width: width,
      height: height,
    }
  }
