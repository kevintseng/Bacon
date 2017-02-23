import React, {Component} from 'react';
import {
    ActivityIndicator,
    Image,
    View,
    Dimensions,
    ScrollView,
    Text
} from 'react-native';
import SwipeCarousel from 'react-native-swipe-carousel';

const {width, height} = Dimensions.get('window'); // eslint-disable-line

export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: {
                width,
                height
            },
            imgLoading: false
        };
    }

    render() {
        return (
            <View style={this.state.size}>
                <SwipeCarousel>
                    <View style={this.state.size}>
                      <Text>Page 1</Text>
                    </View>
                    <View style={this.state.size}><Text>Page 2</Text></View>
                    <View style={this.state.size}><Text>Page 3</Text></View>
                </SwipeCarousel>
            </View>
        );
    }
}
