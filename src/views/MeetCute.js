import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';// eslint-disable-line
import Reactotron from 'reactotron-react-native'; // eslint-disable-line
import DeviceInfo from 'react-native-device-info';
import OthersProfile from './OthersProfile';

const width = Dimensions.get('window').with;

@observer
export default class MeetCute extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.fire;
    this.store = this.props.store;
    this.db = this.props.localdb;
    this.state = {
      user: this.store.user,
      size: { width },
      imgLoading: false,
      list: null,
    };
  }

  componentWillMount() {
    Reactotron.debug('Rendering MeetCute');
    Actions.refresh({ key: 'drawer', open: false });
  }

  componentDidMount() {
    Reactotron.debug('MeetCute rendered');
    const deviceId = DeviceInfo.getUniqueID();
    const locale = DeviceInfo.getDeviceLocale();
    const country = DeviceInfo.getDeviceCountry();
    Reactotron.log('Device ID: ' + deviceId + ', locale: ' + locale + ', country: ' + country);

    if(this.store.user) {
      this.seekMeetQs(this.store.user.sexOrientation);
    }

    if(this.state.list) {
      Reactotron.log('this.state.list:');
      Reactotron.log(this.state.list[1]);
    }

  }

  mq = (cond) => {
    const list = [];
    const ref = this.firebase.database().ref(`seeking/${this.store.user.country}/${cond}`);
    ref.once('value', snap => {
      Reactotron.log('Executing mq cond:' + cond);
      Reactotron.log(snap.val() );
      snap.forEach(childsnap => {
        Reactotron.log(childsnap.val());
        list.push(childsnap.val());
      });
      return list;
    }).then(list => {
      this.setState({ list });
    });
  }

  getProfile = uid => {
    const ref = this.firebase.database().ref('users/' + uid);
    ref.once('value', snap => {
      Reactotron.log('Executing getProfile: ' + uid );
      Reactotron.log('UserProfile' + snap.val() );
      this.setState({
        data: snap.val(),
      });
    })
  }

  seekMeetQs = (so) => {
      let retArr;
      switch(so) {
        case 'msf':
         this.mq('fsm');
         break;
        case 'msm':
          this.mq('msm');
          break;
        case 'msb':
          // TODO: 等註冊多一點用戶後要改回來
          // this.mq('fsm');
          // this.mq('msm');
            this.mq('fsm');
            break;
        case 'fsm':
          this.mq('msf');
         break;
        case 'fsf':
            this.mq('fsf');
          break;
        case 'fsb':
          Object.assign(retArr, this.mq('msf'), this.mq('fsf'));
          break;
      }
  }

  render() {
    return (
      <View>
        <OthersProfile list={this.state.list} />
      </View>
    );
  }
}
