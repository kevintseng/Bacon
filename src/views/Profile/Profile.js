//TODO: 把 renderGallery拉出來變成一個component
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Gallery from './Gallery';
import MyProfile from './MyProfile';
import Report from './Report';


const { width, height } = Dimensions.get('window');
const styles = {
  wrapperStyle: {
    width,
    marginTop: 7,
    paddingTop: 52,
  }
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
    console.log('Rendering Profile');
    Actions.refresh({ key: 'drawer', open: false });
  }

  render() {
    return(
        <ScrollableTabView
          style={styles.wrapperStyle}
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
            tabLabel='我的檔案'
            />
          <Gallery
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            tabLabel='個人相簿'
            />
          <Report
            store={this.store}
            fire={this.firebase}
            storage={this.storage}
            tabLabel='互動分析'
            />
        </ScrollableTabView>
    );
  }
}

export { Profile };
