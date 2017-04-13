import React, { Component } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react/native';
import Moment from 'moment';
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
      list: null,
      next: null,
      loading: true,
    };
    this.seekMeetQs(this.store.user.sexOrientation);
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
  }

  mq = (cond) => {
    const _list = [];
    const query = this.firebase.database().ref(`seeking/${this.store.user.country}/${cond}`);

    query.once('value', snap => {
      Reactotron.log('Executing mq cond:' + cond);
      snap.forEach(childsnap => {
        const _uid = childsnap.val().uid;
        _list.push(_uid);
      });
      Reactotron.log('Print list');
      Reactotron.log(_list);
      this.setState({ list: _list });
    }).then(() => {
      Reactotron.log(_list[0]);
      this.getProfile(_list[0]);
    })
  }

  getProfile = uid => {
    const q = this.firebase.database().ref('users/' + uid);
    q.once('value', snap => {
      Reactotron.log('Profile data:' + snap.val());
      this.setState({
        data: snap.val(),
        loading: false,
      });
    });
  }

  seekMeetQs = (so) => {
    switch(so) {
      case 'msf':
       this.mq('fsm');
       break;
      case 'msm':
        this.mq('msm');
        break;
      case 'fsm':
        this.mq('msf');
       break;
      case 'fsf':
          this.mq('fsf');
        break;
    }
  }

  getNext = () => {
    this.setState({
      loading: true,
    })
    const uid = this.state.data.uid;
    const list = this.state.list;
    Reactotron.log('MeetCute: getNext() pressed');
    const _index = list.indexOf(uid) + 1;
    Reactotron.log(_index);
    if(list.length > _index) {
      this.getProfile(list[_index]);
    } else {
      Reactotron.log('This is the last user');
    }
  }

  handleLike = uid => {
    const r = this.firebase.database().ref('users/' + uid + '/likes');
    const d = {
      uid,
      timestamp: Moment().unix(),
    };
    r.set(d);
  }

  render() {
    const indicator = (<ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', padding: 8, marginTop: 150 }} size='large' />);
    
    return (
      <View>
        <OthersProfile data={this.state.data} getNext={this.getNext} handleLike={this.handleLike}/>
      </View>
    );
  }
}
