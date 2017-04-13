import React, { Component } from 'react';
import { ActivityIndicator, Image, View, Dimensions, ScrollView } from 'react-native';
import { Card, Divider, Button, Text } from 'react-native-elements';
import Carousel from 'react-native-looped-carousel';
import Moment from 'moment';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';// eslint-disable-line
import Reactotron from 'reactotron-react-native'; // eslint-disable-line

const { width, height } = Dimensions.get('window');// eslint-disable-line

@observer
export default class OthersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryAreaSize: { width, height: 320 },
      data: this.props.data,
    };
  }

  componentWillMount() {
    Reactotron.debug('Rendering Profile');
  }

  componentDidMount() {
    Reactotron.debug('Profile rendered');
    Reactotron.log(this.state.data);
  }

  handleGetNext = () => {
    return this.props.getNext();
  }

  render() {
    return (
      <ScrollView>
        <Carousel
          style={this.state.galleryAreaSize}
          autoplay={false}
          bullets
        >
          <View style={this.state.galleryAreaSize}>
            <Image
              key='1'
              style={[this.state.galleryAreaSize, {flex:1, backgroundColor: '#DCDCDC', position: 'absolute'}]}
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
                  onPress={this.handleGetNext}
                />
              </View>
            </Image>
          </View>
          <View style={this.state.galleryAreaSize}>
            <Image
              key='2'
              style={[this.state.galleryAreaSize, {flex:1, backgroundColor: '#DCDCDC', position: 'absolute'}]}
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
                  onPress={this.handleGetNext}
                />
              </View>
            </Image>
          </View>
          <View style={this.state.galleryAreaSize}>
            <Image
              key='3'
              style={[this.state.galleryAreaSize, {flex:1, backgroundColor: '#DCDCDC', position: 'absolute'}]}
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
                  onPress={this.handleGetNext}
                />
              </View>
            </Image>
          </View>
        </Carousel>
        <Card
          containerStyle={{ width: this.state.galleryAreaSize.width, margin: 0, padding: 10 }}>
          <View style={{ flex:0, flexDirection: 'row' }}>
            <Text h4>{this.state.data.displayName}</Text>
            <Text> {Moment().diff(this.state.data.birthday, 'years')}歲, 女</Text>
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
  }
}
