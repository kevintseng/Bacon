import React, { Component, PropTypes } from 'react';
import { View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'; //eslint-disable-line
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import { Card, Text, ListItem, Grid, Row, Col } from 'react-native-elements'; //eslint-disable-line
import PhotoGrid from 'react-native-photo-grid'; //eslint-disable-line
import Reactotron from 'reactotron-react-native';

const {width, height} = Dimensions.get('window'); //eslint-disable-line
const styles = {
  viewWrapper: {
    width,
    height,
  }
};

@observer
export default class Profile extends Component {
  static propTypes = {
    store: PropTypes.object,
    fire: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.fs = this.props.fire;
    this.state = {
      size: {
          width,
          height
      },
      tip: null,
      items: [],
    };
  }

  componentDidMount() {
    Reactotron.log('Profile rendered');
    Actions.refresh({ key: 'drawer', open: false });
    const defaultImage = require('../images/addImage.png');
    // Build an array of 60 photos
    const items = [
      { id: '0', src: defaultImage },
      { id: '1', src: defaultImage },
      { id: '2', src: defaultImage },
      { id: '3', src: defaultImage },
      { id: '4', src: defaultImage },
      { id: '5', src: defaultImage },
      { id: '6', src: defaultImage },
      { id: '7', src: defaultImage },
      { id: '8', src: defaultImage },
      { id: '9', src: defaultImage },
    ];
    this.setState({ items });
  }

  emailPressed = () => {
    this.setState({
      tip: '未認證'
    });
  }

  renderHeader = () => {
    // var filtered = arr.filter(function( element, index, array) { return (index % 2 === 0); });
    return;
  }

  renderItem = (item, itemSize) => {
    return(
      <Col style={{ marginLeft: 5 }}>
        <TouchableOpacity
          key = { item.id }
          style = {{ width: itemSize, height: itemSize }}
          onPress = { () => {
            // Do Something
          }}>
          <Image
            resizeMode = "contain"
            style = {{ flex: 1  }}
            source = { item.src }
          />
        </TouchableOpacity>
      </Col>
    )
  }

  render() {
    const user = this.store.user;
    // const userImg = {uri: user.photoURL};
    const emailVerified = user.emailVerified ? {name: 'beenhere', color: 'skyblue'} : {name: 'report', color: 'orange'};

    return(
      <View style={styles.viewWrapper}>
        <Card
          containerStyle={{ flex: 1, width: this.state.size.width, margin: 0 }}
          wrapperStyle={{ flex: 1 }}
          >
          <View style={{ height: 240, backgroundColor: '#6A85B1', }}>
            <ScrollView
              horizontal
              style={{ marginLeft: 0, height: 240, backgroundColor: '#6A85B1', }}
              >
              <Grid>
                {
                  this.state.items.map(item => this.renderItem(item, 120))
                }
              </Grid>
            </ScrollView>
          </View>
          <ListItem
            key={user.email}
            title='Email'
            subtitle={user.email}
            rightTitle={this.state.tip}
            rightIcon={emailVerified}
            onPress={this.emailPressed}
            />


        </Card>
      </View>
    );
  }
}
