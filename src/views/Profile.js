//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { View, Dimensions, Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-looped-carousel';
import { observer } from 'mobx-react/native';
import { Card, ListItem, Button } from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MessageBarAlert from 'react-native-message-bar/MessageBar';
import MessageBarManager from 'react-native-message-bar/MessageBarManager';

const { width, height } = Dimensions.get('window');

const styles = {
  viewWrapper: {
    width,
  },
  container: {
      width,
      height: 200,
  },
  gallery: {
      flexDirection: 'row'
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  photo: {
      flex: 1
  }
};

@observer
export default class Profile extends Component {
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
      tip: null,
      imgLoading: false,
    };

  }

  componentWillMount() {
    Reactotron.log('Rendering Profile');
    Actions.refresh({ key: 'drawer', open: false });
  }

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  handleAlert(msg) {
    MessageBarManager.showAlert({
      title: 'title',
      message: msg,
      alertType: 'info',
      position: 'bottom',
    });
  }

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  render() {
    const user = this.store.user;
    // const userImg = {uri: user.photoURL};
    const emailVerified = user.emailVerified ? {name: 'beenhere', color: 'skyblue'} : {name: 'report', color: 'orange'};

    return(
      <View>
        <ScrollView style={styles.viewWrapper} contentContainerStyle={{
        alignItems: 'center', width }}>
          <Card
            containerStyle={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: this.state.size.width, margin: 0, padding: 0 }}
            wrapperStyle={{flex: 1, margin: 0, padding: 0}}
            >
            <Carousel
              style={styles.container}
              autoplay={false}
              bullets
              >
              <View style={styles.container}>
                <Image
                  key='1'
                  resizeMode='contain'
                  style={[styles.container, {backgroundColor: '#DCDCDC'}]}
                  onLoadStart={() => this.setState({ imgLoading: true })}
                  onLoad={() => this.setState({ imgLoading: false })}
                  source={{uri: 'https://loremflickr.com/320/300/taiwan,woman/?random=1'}}>
                  {
                    this.state.imgLoading && <View style={{ flex:1, width: this.state.size.width, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='white' /></View>
                  }
                  {
                    !this.state.imgLoading && <EditBar handleAlert={this.handleAlert.bind(this)}/>
                  }
                </Image>
              </View>
              <View style={styles.container}>
                <Image
                  key='2'
                  resizeMode='contain'
                  style={[styles.container, {backgroundColor: '#DCDCDC'}]}
                  onLoadStart={() => this.setState({ imgLoading: true })}
                  onLoad={() => this.setState({ imgLoading: false })}
                  source={{uri: 'https://loremflickr.com/320/300/taiwan,woman/?random=1'}}>
                  {
                    this.state.imgLoading && <View style={{ flex:1, width: this.state.size.width, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='white' /></View>
                  }
                  {
                    !this.state.imgLoading && <EditBar />
                  }
                </Image>
              </View>
            </Carousel>
            <ListItem
              key={user.email}
              title='Email'
              subtitle={user.email}
              rightTitle={this.state.tip}
              rightIcon={emailVerified}
              onPress={this.emailPressed}
              />
          </Card>
        </ScrollView>
        <MessageBarAlert ref='alert' />
      </View>
    );
  }
}

class EditBar extends Component {
  constructor(props) {
    super(props);
  }

  handlePressed = () => {
    this.props.handleAlert('pressed');
  }

  render() {
    return(
      <View style={{ alignSelf: 'center', flex:0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#424242', opacity: 0.8, width, height: 50 }}>
        <Button
          icon={{ name: 'delete', color: 'white', size: 30 }}
          backgroundColor='transparent'
          onPress={this.handlePressed}
        />
        <Button
          icon={{ name: 'add-to-photos', color: 'white', size: 30 }}
          backgroundColor='transparent'
          onPress={() => {}}
        />
      </View>
    );
  }

}
