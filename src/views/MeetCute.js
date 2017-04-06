import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, Image, View, Dimensions, ScrollView } from 'react-native';
import { Card, Divider, Button, Text } from 'react-native-elements';
import Carousel from 'react-native-looped-carousel';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import Reactotron from 'reactotron-react-native';

const { width, height } = Dimensions.get('window');

@observer
export default class MeetCute extends Component {
  constructor(props) {
    super(props);
    this.firebase = this.props.fire;
    this.store = this.props.store;
    this.localdb = this.props.localdb;
    this.state = {
      size: { width, height: 320 },
      imgLoading: false,
      list: null,
    };
  }

  componentWillMount() {
    Reactotron.debug('Rendering MeetCute');
    Actions.refresh({ key: 'drawer', open: false });
  }

  componentDidMount() {
    const ref = this.firebase.database().ref('users').equalTo('gender/f');
    ref.once('value', snapshot => {
      Reactotron.log('snapshot');
      Reactotron.log(snapshot)
    });
  }

  render() {
    const content = (
      <ScrollView>
        <Carousel
          style={[this.state.size]}
          autoplay={false}
          bullets
        >
          <View style={this.state.size}>
            <Image
              key='1'
              style={[this.state.size, {flex:1, backgroundColor: '#DCDCDC', position: 'absolute'}]}
              onLoadStart={() => this.setState({ imgLoading: true })}
              onLoad={() => this.setState({ imgLoading: false })}
              source={{uri: 'https://loremflickr.com/320/300/taiwan,woman/?random=1'}}>
              {
                this.state.imgLoading && <View style={{ flex:1, alignItems: 'center', justifyContent: 'flex-end' }}><ActivityIndicator size='large' color='white' /></View>
              }
              <View style={{ flex:1, marginLeft: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Button
                  icon={{ name: 'heart', type: 'evilicon', color: 'white', size: 70 }}
                  backgroundColor='transparent'
                  onPress={() => {}}
                />
                <Button
                  icon={{ name: 'close-o', type: 'evilicon', color: 'white', size: 70 }}
                  backgroundColor='transparent'
                  onPress={() => {}}
                />
              </View>
            </Image>
          </View>
          <View style={this.state.size}>
            <Image
              key='2'
              style={[this.state.size, {flex:1, backgroundColor: '#DCDCDC', position: 'absolute'}]}
              onLoadStart={() => this.setState({ imgLoading: true })}
              onLoad={() => this.setState({ imgLoading: false })}
              source={{uri: 'https://loremflickr.com/320/300/taiwan,woman/?random=2'}}>
              {
                this.state.imgLoading && <View style={{ flex:1, alignItems: 'center', justifyContent: 'flex-end' }}><ActivityIndicator size='large' color='white' /></View>
              }
              <View style={{ flex:1, marginLeft: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Button
                  icon={{ name: 'heart', type: 'evilicon', color: 'white', size: 70 }}
                  backgroundColor='transparent'
                  onPress={() => {}}
                />
                <Button
                  icon={{ name: 'close-o', type: 'evilicon', color: 'white', size: 70 }}
                  backgroundColor='transparent'
                  onPress={() => {}}
                />
              </View>
            </Image>
          </View>
          <View style={this.state.size}>
            <Image
              key='3'
              style={[this.state.size, {flex:1, backgroundColor: '#DCDCDC', position: 'absolute'}]}
              onLoadStart={() => this.setState({ imgLoading: true })}
              onLoad={() => this.setState({ imgLoading: false })}
              source={{uri: 'https://loremflickr.com/320/300/taiwan,woman/?random=3'}}>
              {
                this.state.imgLoading && <View style={{ flex:1, alignItems: 'center', justifyContent: 'flex-end' }}><ActivityIndicator size='large' color='white' /></View>
              }
              <View style={{ flex:1, marginLeft: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Button
                  icon={{ name: 'heart', type: 'evilicon', color: 'white', size: 70 }}
                  backgroundColor='transparent'
                  onPress={() => {}}
                />
                <Button
                  icon={{ name: 'close-o', type: 'evilicon', color: 'white', size: 70 }}
                  backgroundColor='transparent'
                  onPress={() => {}}
                />
              </View>
            </Image>
          </View>
        </Carousel>
        <Card
          containerStyle={{ width: this.state.size.width, margin: 0, padding: 10 }}>
          <View style={{ flex:0, flexDirection: 'row' }}>
            <Text h4>Carol </Text>
            <Text> 23歲, 女</Text>
          </View>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
          <Divider style={{ marginVertical: 5 }}/>
          <Text style={{ color: '#6A5ACD' }}>
            興趣
          </Text>
          <Text style={{ alignSelf: 'flex-end' }}>
            吃飯, 喝水, 睡覺, 灑尿
          </Text>
        </Card>
      </ScrollView>
    );

    return (
      <View>
        {content}
      </View>
    );
  }
}
