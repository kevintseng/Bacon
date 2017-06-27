import React from 'react';
//import { View } from 'react-native';
//import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react/native';
import PhotoBrowser from 'react-native-photo-browser';
/*
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
    },
    {
      photo: 'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
      selected: true,
      caption: 'Grotto of the Madonna',
    }]
*/
const Album = inject("SubjectStore")(observer(({ SubjectStore }) => {

  const media_self = [{photo: SubjectStore.photoURL, selected: false, caption: 'Grotto of the Madonna'}]

  const media = SubjectStore.photos.map((ele) => { return { photo: ele.src.uri, selected: false, caption: 'Grotto of the Madonna' } })

  const medias = media_self.concat(media)

  return(
        <PhotoBrowser
          style={{flex: 1}}
          displayTopBar = {false}
          //onBack={()=>{ Actions.AboutMeShow() }}
          mediaList={medias}
          //initialIndex={initialIndex}
          displayNavArrows
          displaySelectionButtons
          displayActionButton
          startOnGrid
          enableGrid
          useCircleProgress
          //controlsDisplayed
          alwaysShowControls
          //onSelectionChanged={this._onSelectionChanged}
          //onActionButton
        />

  )
}))

export default Album