import React, { Component } from 'react'
import { View, Text, Button, Platform, Dimensions, BackHandler, ToastAndroid, Image, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'


const { width, height } = Dimensions.get('window')

const styles = {
  titile: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    backgroundColor: 'transparent',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    padding: 10
  },
  text: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    backgroundColor: 'transparent',
    padding: 10
  }
}

@inject('firebase', 'SubjectStore') @observer 
export default class ArticleDetailScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
  }


  render() {

    const { articleAitle, uri, content } = this.props

    return (
      <ScrollView>
        <Text style={styles.titile}>{articleAitle}</Text>
        <Image resizeMode={'cover'} style={{width,height: width}} source={uri}/>
        <Text style={styles.text}>{ content }</Text>
      </ScrollView>
    )
  }
}
