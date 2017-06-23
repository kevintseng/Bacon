import React from 'react';
import { View, StatusBar } from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
import { Actions } from 'react-native-router-flux'

const media = [{
      photo: 'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
      selected: true,
      caption: 'Grotto of the Madonna',
    }, {
      photo: 'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_b.jpg',
      caption: 'Broadchurch Scene',
    }, {
      photo: 'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_b.jpg',
      thumb: 'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_q.jpg',
      selected: false,
      caption: 'Beautiful Eyes',
    }]

const PhotoView = () => {
  return(
    <View style={{flex:1}}>
        <PhotoBrowser
          style={{flex: 1}}
          displayTopBar
          onBack={()=>{ Actions.AboutMeShow() }}
          mediaList={media}
          //initialIndex={initialIndex}
          displayNavArrows
          displaySelectionButtons
          displayActionButton
          startOnGrid
          enableGrid
          useCircleProgress
          //controlsDisplayed={false}
          alwaysShowControls
          //onSelectionChanged={this._onSelectionChanged}
          //onActionButton
        />
    </View>
  )
}

export default PhotoView