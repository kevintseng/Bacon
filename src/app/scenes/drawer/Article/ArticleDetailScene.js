import React, { Component } from 'react'
import { View, Text, Button, Platform, Dimensions, BackHandler, ToastAndroid, Image, ScrollView, Linking, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import StarRating from 'react-native-star-rating'


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
    padding: 10,
    lineHeight: 30
  },
  articleSource: {
    alignItems: 'flex-end'    
  },
  subtitle: {
    color: '#606060',
    letterSpacing: 3,
    fontFamily: 'NotoSans', 
    backgroundColor: 'transparent',
    padding: 10,
    fontWeight: '500',
    lineHeight: 30  
  }
}

@inject('firebase', 'SubjectStore') @observer 
export default class ArticleDetailScene extends Component {

  constructor(props) {
    super(props)
    this.firebase = this.props.firebase
    this.SubjectStore = this.props.SubjectStore
  }

  onStarRatingPress(id,rating) {
    this.SubjectStore.setStars(id,rating)
    this.firebase.database().ref('users/' + this.SubjectStore.uid + '/stars').set(this.SubjectStore.stars)
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    Actions.pop()
    return true
  }

  goToArticleSource = () => {
    Linking.openURL(this.props.articleSource).catch(err => console.error('An error occurred', err))
  }

  goToStageSource = () => {
    Linking.openURL(this.props.stageSource).catch(err => console.error('An error occurred', err))
  }

  goToLink = () => {
    Linking.openURL(this.props.promoteLink).catch(err => console.error('An error occurred', err))
  }


  render() {

    const { id, articleTitle, uri, content, articleSource, stageSource, stageName, stageTag, promoteStore, promoteTitle, promoteLink } = this.props

    return (
      <ScrollView>
        <Text style={styles.titile}>{articleTitle}</Text>
        <Image resizeMode={'cover'} style={{width,height: width}} source={uri}/>
        <Text style={styles.text}>{ content }</Text>
        { articleSource &&
          <TouchableOpacity onPress={this.goToArticleSource}>
            <Text style={[styles.text,{textAlign: 'right'}]}>查看原始文章</Text>
          </TouchableOpacity>
        }
        { stageSource &&
          <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
            <Text style={[styles.subtitle]}>{ stageTag }</Text>
            <TouchableOpacity onPress={this.goToStageSource}>
              <Text style={[styles.text]}>{ stageName }</Text>
            </TouchableOpacity>
          </View>
        }
        <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
          <Text style={[styles.subtitle]}>{ promoteStore }</Text>
          <TouchableOpacity onPress={this.goToLink}>
            <Text style={[styles.text]}>{ promoteTitle }</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.text,{textAlign: 'center'}]}>我對這篇文章的評價</Text>
        <View style={{alignSelf: 'center',paddingBottom: 10}}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.SubjectStore.stars[id]}
            selectedStar={ rating => this.onStarRatingPress(id,rating) }
            starColor={'#d63768'}
          />
        </View>
      </ScrollView>
    )
  }
}
