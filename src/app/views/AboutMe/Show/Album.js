import React from 'react';
import { TouchableWithoutFeedback, View, Button, Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import PhotoBrowser from 'react-native-photo-browser';
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'

const {width} = Dimensions.get('window')

const styles = {
  modalContent: {
    //backgroundColor: 'white',
    //padding: 22,
    //borderRadius: 4,
    //borderColor: 'rgba(0, 0, 0, 0.1)',
    width: width/2
  }
}

const Album = inject("SubjectStore")(observer(({ SubjectStore }) => {

  const media_self = [{photo: SubjectStore.photoURL, selected: false }]

  const media = SubjectStore.photos.map((ele) => { return { photo: ele.src.uri, selected: false } })

  const medias = media_self.concat(media)

  const handlePressed = () => {
    ImagePicker.openPicker({
      cropping: true,
      multiple: true,
      isCamera: true
    }).then(images => {
      console.log(images);
    });
  }

  return(
    <View style={{flex: 1}}>
        <PhotoBrowser
          displayTopBar = {false}
          //onBack={()=>{ Actions.AboutMeShow() }}
          mediaList={medias}
          //initialIndex={initialIndex}
          displayNavArrows
          //displaySelectionButtons
          displayActionButton
          startOnGrid
          enableGrid
          useCircleProgress
          //controlsDisplayed
          alwaysShowControls
          //onSelectionChanged={this._onSelectionChanged}
          onActionButton={() => {SubjectStore.setShowModal(true)}}
        />
        <Button
          title='+' 
          color="#ff6347"
          onPress={handlePressed}
        />
          <TouchableWithoutFeedback onPress={() => {SubjectStore.setShowModal(false)}}>
          <Modal
            isVisible={SubjectStore.showModal}
            //backdropOpacity={1}
            //backdropColor={'white'}
            //offset={0}
            //overlayBackground={'rgba(0, 0, 0, 0.75)'}
            //animationDuration={200}
            //animationTension={40}
            //modalDidOpen={() => {console.log('modal open')}}
            hideOnBack
            //onModalHide={() => {alert("hide")}}
            //onBackButtonPress={() => {SubjectStore.setShowModal(false)}}
            closeOnTouchOutside
            //containerStyle={{
            //  justifyContent: 'center'
            //}}
            style={{
              //backgroundColor: '#000000',
              margin: 0,
              alignItems: 'center'
              //width,
              //height
            }}
            >
              <View style={styles.modalContent}>
                <Button
                  title='將此照片設為頭像'
                  color={'#2e8b57'}
                  onPress={() => {alert("設為頭像")}}
                  />
                <Button
                  title='刪除此照片'
                  color={'#ff0000'}
                  onPress={() => {alert("刪除照片")}}
                />
              </View>
          </Modal>
          </TouchableWithoutFeedback>
    </View>
  )
}))

export default Album