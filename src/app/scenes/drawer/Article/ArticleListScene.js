import React, { Component } from 'react'
import { View, Text, Button, Platform, BackHandler, ToastAndroid, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

import ArticleList from '../../../views/ArticleList'
import Articles from '../../../../configs/Articles'

const styles = {
  view: {
    marginTop: 10
  }
}

@inject('firebase', 'SubjectStore') @observer 
export default class ArticleListScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  componentWillMount() {
    Actions.refresh({ key: 'Drawer', open: false })
  }

  componentDidMount() {
    //
  }

  goToArticleDetail = (key,title,uri,content,source,stageSource,stageName,stageTag,promoteStore,promoteTitle,promoteLink) => {
    Actions.ArticleDetail({id: key, articleTitle: title, uri: uri, content: content, articleSource: source, stageSource: stageSource, stageName: stageName, stageTag: stageTag, promoteStore: promoteStore, promoteTitle: promoteTitle, promoteLink: promoteLink})
  }

  render() {
    return (
      <View style={styles.view}>
        <FlatList
          removeClippedSubviews
          data={ Articles }
          numColumns={1}
          renderItem={({item}) =>
            <ArticleList 
              author={item.author}
              avatar={item.avatar}
              source={item.uri}
              title={item.title}
              tags={item.tags}
              onPress={ () => { this.goToArticleDetail(item.key, item.title, item.uri, item.content,item.source,item.stageSource,item.stageName,item.stageTag,item.promoteStore,item.promoteTitle,item.promoteLink) } }
              />

           }
        />
      </View>
    )
  }
}
