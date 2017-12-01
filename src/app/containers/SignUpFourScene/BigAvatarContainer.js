import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

import BigAvatar from "../../views/BigAvatar/BigAvatar";

const options = {
  title: "請上傳一張大頭照",
  takePhotoButtonTitle: "使用相機現場拍一張",
  chooseFromLibraryButtonTitle: "從相簿中選擇",
  cancelButtonTitle: "取消",
  mediaType: "photo",
  maxWidth: 600,
  maxHeight: 600,
  quality: 1.0,
  noData: false,
  storageOptions: { skipBackup: true, path: "Bacon" }
};

@inject("SignUpStore")
@observer
export default class BigAvatarContainer extends Component {
  constructor(props) {
    super(props);
    this.SignUpStore = this.props.SignUpStore;
  }

  addImage = () => {
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        //
      } else if (res.error) {
        console.log(res.error);
      } else {
        ImageResizer.createResizedImage(res.uri, 600, 600, "JPEG", 100) // (imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath)
          .then(image => {
            console.log(image);
            this.SignUpStore.setAvatar(image.uri);
            this.SignUpStore.setAlbum(Date.now(), image.uri);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    return (
      <BigAvatar
        imgSource={this.SignUpStore.avatar}
        topButtonText="新增個人照片一張"
        topButtonOnPress={this.addImage}
      />
    );
  }
}
