import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import ArticleList from '../../../views/ArticleList'

const data = [
  {key: 1, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'},
  {key: 2, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'},
  {key: 3, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'},
  {key: 4, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'},
  {key: 5, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'},
  {key: 6, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'},
  {key: 7, uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKsTsB05e6xKVlF6SaX6kDOsov5GbGvS4oE38QRwAiugDHm5cAQOBqqw',title:'愛情市場學，愛上宅男的五大好處'}
] 

@inject('firebase', 'SubjectStore') @observer 
export default class ArticleScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount = async () => {
    await this.sleep(260)
  }

  componentWillUnmount() {
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    return (
      <View>
        <FlatList
          removeClippedSubviews
          data={ data }
          numColumns={1}
          renderItem={({item}) =>
            <ArticleList 
              source={item.uri}
              title={item.title}/>
           }
        />
      </View>
    )
  }
}
