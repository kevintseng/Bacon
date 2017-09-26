import React, { Component } from 'react'
import { View, Text, Button, Platform, Dimensions, BackHandler, ToastAndroid, Image, ScrollView, Linking, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import StarRating from 'react-native-star-rating';


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
  },
  articleSource: {
    alignItems: 'flex-end'    
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
  }

  goToArticleSource = () => {
    Linking.openURL(this.props.articleSource).catch(err => console.error('An error occurred', err))
  }

  goToStageSource = () => {
    Linking.openURL(this.props.stageSource).catch(err => console.error('An error occurred', err))
  }

  goToLink = () => {
    Linking.openURL('http://www.pcstore.com.tw/pchome24h/M16656421.html').catch(err => console.error('An error occurred', err))
  }


  render() {

    const { id, articleAitle, uri, content, articleSource, stageSource, stageName, stageTag } = this.props

    return (
      <ScrollView>
        <Text style={styles.titile}>{articleAitle}</Text>
        <Image resizeMode={'cover'} style={{width,height: width}} source={uri}/>
        <Text style={styles.text}>{ content }</Text>
        { articleSource &&
          <TouchableOpacity onPress={this.goToArticleSource}>
            <Text style={[styles.text,{textAlign: 'right'}]}>查看原始文章</Text>
          </TouchableOpacity>
        }
        <Text style={[styles.text,{textAlign: 'right'}]}>{ stageTag }</Text>
        { stageSource &&
          <TouchableOpacity onPress={this.goToStageSource}>
            <Text style={[styles.text,{textAlign: 'right'}]}>{ stageName }</Text>
          </TouchableOpacity>
        }
        <Text style={[styles.text,{textAlign: 'right'}]}>PChome 24小時購物</Text>
        <TouchableOpacity onPress={this.goToLink}>
          <Text style={[styles.text,{textAlign: 'right'}]}>越做越愛：男女必修性愛學分 (限)</Text>
        </TouchableOpacity>
        <Text style={[styles.text,{textAlign: 'center'}]}>我對這篇文章的評價</Text>
        <View style={{alignSelf: 'center'}}>
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
