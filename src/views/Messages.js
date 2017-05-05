import React, { Component } from "react";
import {
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";
import { List, ListItem } from "react-native-elements";
import SwipeList from 'react-native-smooth-swipe-list';
import DropdownMenu from "react-native-dropdown-menu";
// import Moment from "moment";

const { width, height } = Dimensions.get("window"); //eslint-disable-line
const menuData = [['所有訊息', '未讀訊息', '訪客訊息'], ['我的狀態', '放空中', '忙碌中', '低潮中']];
const list = [
  {
    uid: 'sampleUser1',
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
    chatStatus: '忙碌中',
  },
  {
    uid: 'sampleUser2',
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
    chatStatus: '忙碌中',
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
    this.state = {
      size: {
        width,
        height
      },
      chatrooms: [],
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
              {list.map((l, i) => (
                <ListItem
                  roundAvatar
                  avatar={{ uri: l.avatar_url }}
                  key={l.uid}
                  title={l.name}
                  onPress={() => {
                    Actions.chat({uid: l.uid, name: l.name, chatStatus: l.chatStatus});
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
