import React, {Component, PropTypes} from 'react';
import { View, Dimensions, StyleSheet, ListView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Text ,List, ListItem, FormInput, Button} from 'react-native-elements';
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
    ReactionText: PropTypes.string,
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
    Reactotron.log('Rendering Reaction');
    Actions.refresh({ key: 'drawer', open: false });
  }

  onReactionTextChange = ReactionText => {
    this.setState({
      ReactionText: ReactionText.trim(),
    });
  }


  SendReaction = async () =>{
    let user = this.store.user
    console.log(user.uid);
    console.log(this.state.ReactionText);

    this.fs.database().ref('reaction/').set({
      uid: user.uid,
      text: this.state.ReactionText,
  });

  }



  render() {
    return(

      <View style={{marginTop:20}}>
        <FormInput
          multiline = {true}
          numberOfLines = {4}
          editable = {true}
          maxLength = {200}
          containerStyle={{height: 80}}
          onChangeText={(ReactionText) => this.setState({ReactionText})}
          value={this.state.ReactionText}
        />

        <Button
          backgroundColor='#007AFF'
          //color='#007AFF'
          buttonStyle={styles.buttonTop}
          onPress={this.SendReaction}

          title='送出' />

      </View>

    );
  }

}

const styles = {
  buttonTop: {
    marginTop: 20
  },

  wrapper: {
   borderRadius: 5,
   marginBottom: 5,
 },
 button: {
   backgroundColor: '#eeeeee',
   padding: 10,
 },
}
