import React, { Component } from "react";
import {
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem, Text, Badge } from "react-native-elements";
import SwipeList from 'react-native-smooth-swipe-list';
import DropdownMenu from "react-native-dropdown-menu";
// import Moment from "moment";

const { width, height } = Dimensions.get("window"); //eslint-disable-line
const menuData = [['所有訊息', '未讀訊息', '訪客訊息'], ['我的狀態', '放空中', '忙碌中', '低潮中']];
const list = [
  {
    uid: 'sampleUser1',
    name: "Amy Farhaaaaa",
    avatarUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
    chatStatus: '忙碌中',
    age: 31
  },
  {
    uid: 'sampleUser2',
    name: "Chris Jackson",
    avatarUrl: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
    chatStatus: '忙碌中',
    age: 22
  }
];

const styles = {

};

@observer
export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.convRef = this.firebase.database().ref('conversations/' + this.store.user.uid);
    this.state = {
      size: {
        width,
        height
      },
      convs: [],
      isLoading: false,
      pickerShow: false,
      status: this.store.user.chatStatus ? this.store.user.chatStatus : "我的狀態",
      listFilter: 'all'

    };
    this._isMounted = false;
  }

  componentWillMount() {
    console.debug("Rendering Messages");
    this._isMounted = false;
    Actions.refresh({ key: "drawer", open: false });
  }
  componentDidMount() {
    console.debug("Messages mounted");
    this._isMounted = true;
    this.getConvs();
  }

  getConvs = () => {
    this.convRef.once('value').then(snapForConvs=> {
      // console.log('CHECK: ', snap.val());
      const convs = [];
      snapForConvs.forEach(childConv => {
        const queryKey = childConv.val().uid;

        this.firebase.database().ref('messages/' + this.store.user.uid + '/' + queryKey).limitToLast(1).once('value').then(snapshot => {
          let subtitle = '';

          if(snapshot.exists()) {
            snapshot.forEach(_msg => {
              // console.log('_mag.val()', _msg.val());
              if(_msg.child('image').exists()) {
                console.log('Image exists');
                subtitle = '傳了一張圖';
              }

              if(_msg.child('text').exists() && _msg.val().text != '') {
                // console.log('Text exists');
                subtitle = _msg.val().text;
              }
            });
          }
          const data = {
            uid: childConv.val().uid,
            name: childConv.val().name,
            avatarUrl: childConv.val().avatarUrl,
            chatStatus: childConv.val().chatStatus,
            age: childConv.val().age,
            subtitle,
          };
          convs.push(data);
          this.setState({
            convs,
          });
        });
      });
    });
  }

  renderSubtitle = (subtitle, status) => {
    return (
      <Badge containerStyle={{ backgroundColor: 'orange' }}>
        <Text style={{ fontSize: 11, color: 'white' }}>status</Text>
      </Badge>
    );
    // switch(status) {
    //   case '忙碌中':
    //    return (
    //     <View style={{ flex: 1, marginHorizontal: 10, flexDirection: 'row' }}>
    //       <Badge containerStyle={{ backgroundColor: 'orange' }}>
    //         <Text style={{ fontSize: 11, color: 'white' }}>{status}</Text>
    //       </Badge>
    //       <Text style={{ fontSize: 11 }}>{subtitle}</Text>
    //     </View>
    //     );
    //   case '放空中':
    //    return (
    //     <View style={{ flex: 1, marginHorizontal: 10, flexDirection: 'row' }}>
    //       <Badge containerStyle={{ backgroundColor: 'Yellow' }}>
    //         <Text style={{ fontSize: 11, color: 'gray' }}>{status}</Text>
    //       </Badge>
    //       <Text style={{ fontSize: 11 }}>{subtitle}</Text>
    //     </View>
    //    );
    //   case '低潮中':
    //     return (
    //       <View style={{ flex: 1, marginHorizontal: 10, flexDirection: 'row' }}>
    //         <Badge containerStyle={{ backgroundColor: 'blue' }}>
    //           <Text style={{ fontSize: 11, color: 'white' }}>{status}</Text>
    //         </Badge>
    //         <Text style={{ fontSize: 11 }}>{subtitle}</Text>
    //       </View>
    //     );
    // }
  }

  handleStatusChange = (val, selection, row) => {
    let listFilter = 'all';
    if(selection === 0) {
      switch(row) {
        case 1:
          listFilter = 'unread';
          break;
        case 2:
          listFilter = 'visitor';
          break;
        default:
          listFilter = 'all';
          break;
      }
      this.setState({
        listFilter,
      });
    } else if(selection === 1) {
      this.store.setChatStatus(this.firebase, val);
    }
    // console.log('selection: ', selection, ' row: ', row, ' val: ', val, ' listFilter: ', listFilter);
  };

  render() {
    console.log('this.state: ', this.state);
    return (
      <View style={this.state.size}>
        <ScrollView style={{ marginTop: 5 }}>
          <DropdownMenu style={{flex: 1 }}
            arrowImg={require('../images/dropdown_arrow.png')}
            checkImage={require('../images/menu_check.png')}
            bgColor={"#FDD835"}
            tintColor={"white"}
            selectItemColor={"red"}
            data={menuData}
            maxHeight={410}
            handler={(selection, row) => this.handleStatusChange(menuData[selection][row], selection, row)} >
            <List containerStyle={{ marginBottom: 20, marginTop: -2 }}>
              {this.state.convs.map((l, i) => (
                <ListItem
                  roundAvatar
                  avatar={{ uri: l.avatarUrl }}
                  key={l.uid}
                  title={l.name}
                  subtitle={this.renderSubtitle(l.subtitle, l.chatStatus)}
                  onPress={() => {
                    Actions.chat({uid: l.uid, name: l.name, chatStatus: l.chatStatus, age: l.age, avatarUrl: l.avatarUrl});
                  }}
                />
              ))}
            </List>
          </DropdownMenu>
        </ScrollView>
      </View>
    );
  }
}
