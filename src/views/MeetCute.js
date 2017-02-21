import React, { Component } from 'react';
import { ActivityIndicator, Image, View, Dimensions, ScrollView, Text } from 'react-native';
import { Card, Divider, Button } from 'react-native-elements';
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');// eslint-disable-line

export default class MeetCute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: { width, height: 320 },
      imgLoading: false,
    };
  }

  render() {
    return (
      <ScrollView>
        <Carousel
          style={this.state.size}
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
          title='Carol'>
          <Text>
            23歲, 女
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
