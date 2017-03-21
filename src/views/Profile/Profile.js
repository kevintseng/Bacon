//TODO: 把 renderGallery拉出來變成一個component
import React, { Component } from 'react';
import { Dimensions, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import Reactotron from 'reactotron-react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Gallery from './Gallery';
import MyProfile from './MyProfile';
import Report from './Report';


const { width, height } = Dimensions.get('window');
const styles = {
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  // card: {
  //   borderWidth: 1,
  //   backgroundColor: '#fff',
  //   borderColor: 'rgba(0,0,0,0.1)',
  //   margin: 5,
  //   height: 150,
  //   padding: 15,
  //   shadowColor: '#ccc',
  //   shadowOffset: { width: 2, height: 2, },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 3,
  // },
};

@observer
class Profile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
    this.state = {
      size: {
          width,
          height
      },
    };

  }

  componentWillMount() {
    Reactotron.log('Rendering Profile');
    Actions.refresh({ key: 'drawer', open: false });
  }

  render() {
    return(
        <ScrollableTabView
          style={{ marginTop: 6, paddingTop: 55, paddingHorizontal: 5 }}
          tabBarPosition='overlayTop'
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={{ backgroundColor: '#2962FF' }}
          tabBarBackgroundColor='white'
          tabBarActiveTextColor='#2962FF'
          tabBarInactiveTextColor='grey'
          ref={(tabView) => { this.tabView = tabView; }}
          >
          <MyProfile
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            style={styles.tabView}
            tabLabel='交友自介'
            />
          <Gallery
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            style={styles.tabView}
            tabLabel='個人相簿'
            />
          <Report
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            style={styles.tabView}
            tabLabel='互動分析'
            />
        </ScrollableTabView>
    );
  }
}

export { Profile };
