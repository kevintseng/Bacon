import React, {Component, PropTypes} from 'react';
import {
    View,
    Dimensions,
    Text,
    Image, } from 'react-native'; // eslint-disable-line
import UserAvatar from 'react-native-user-avatar';
import { Card, Button } from 'react-native-elements'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import { autorun } from 'mobx'; // eslint-disable-line
import { observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import { Header } from '../../components/Header';
import { FirebaseConfig } from '../../Configs';

const {width, height} = Dimensions.get('window'); //eslint-disable-line

const emptyImg = require('./cameraPlaceholder.jpg');
const { storageBucket } = FirebaseConfig;
const ipOptions = {
  title: '上傳照片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
};

@observer
export class Signup4 extends Component {
  static propTypes = {
    fire: PropTypes.object,
    store: PropTypes.object,
    sustore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.sustore = this.props.sustore;
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height: 600
      },
      image: null,
      imageHeight: null,
      imageWidth: null,
      photoUrl: null,
    };
  }

  componentWillMount() {
    this.fs.storage.setStorageUrl(storageBucket);
  }

  updatePhotoUrl = (photoUrl = 'test') => {
    this.setState({
      photoUrl,
    })
    Reactotron.log('set photo');
  }

  addImage = () => {
    ImagePicker.showImagePicker(null, (res) => {
      if(res.didCancel) {
        return;
      } else if(res.error) {
        Reactotron.error('ImagePicker Error: ' + res.error);
      } else {
        let source = { uri: res.uri };
        this.setState({
          image: source,
          imageHeight: res.height,
          imageWidth: res.width,
        });
      }
    });
  }

  handleSubmit = () => {
      // return Actions.pop({popNum: 3});
      // return Actions.meetcute({type:'reset'})
  }

  render() {
    const { nickname } = this.sustore;
    return (
      <View style={[this.state.size, {flexGrow: 1, }]}>
        <Header
          headerText='上傳個人照'
          rightButtonText='完成'
          onRight={this.handleSubmit}
          rightColor='#007AFF'
          onLeft={() => Actions.pop()}
          leftColor='#007AFF'
        />
        <View style={{ marginBottom: 20 }}>
          <Card>
            <UserAvatar
              style={{ alignSelf: 'center', marginBottom: 10 }}
              size='150'
              name={nickname}
              src={this.state.image}
              />
            <Text style={{marginBottom: 10}}>
              根據最新英國研究報告, 在交友app上顯示您的個人照片會提高配對成功機率喔！
              無論你信不信, 反正我信了。</Text>
            <Button
              icon={{name: 'add'}}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='新增個人照片'
              onPress={this.addImage}
            />
          </Card>
          <Button
            style={{ marginTop: 10 }}
            backgroundColor='transparent'
            color='#007AFF'
            title={'完成'}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}
