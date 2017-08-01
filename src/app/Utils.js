import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native'
import Moment from "moment"

export function getAge(birthday) {
  if(!birthday) {
    return -1;
  }
  const age = Moment().diff(birthday, 'years');
  return age;
}

export function calculateAge(birthday) {
  const ageDifMs = Date.now() - new Date(birthday).getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export function emailFormatChecker(email) {
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }
  return false;
}

export function presenceMonitor(user, fb) {
  const timestamp = Math.floor(Date.now() / 1000);

  fb.presence.on(user.uid)
    .setOnline()
    .onConnect(ref => {
      ref.set({
        online: true,
        lastOnline: timestamp,
        location: 'taipei'
      });
      console.log('Connected');
      ref.onDisconnect(ref=>{
        ref.set({
          online: false,
          location: null,
          lastOnline: timestamp,
        })
      });
    });
}

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export function resizeImage(uri, width, height, mime, quality) {
  console.log('Resizing image...');
  const imageFileType = mime.replace("image/", "").toUpperCase();
  return ImageResizer.createResizedImage(uri, width, height, imageFileType, quality)
  .then((resizedImageUri) => {
    console.log('Image resized: ' +  resizedImageUri);
    return resizedImageUri;
  })
  .catch(err => {
    console.error(err.code);
  });
}

export function uploadImage(uri, firebaseRefObj, mime = 'image/jpeg') {
  console.debug('Uploading image: ' + uri);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  let uploadBlob = null;
  const imageRef = firebaseRefObj;
  return fs.readFile(uploadUri, 'base64')
    .then((data) => {
      return Blob.build(data, { type: `${mime};BASE64` });
    })
    .then((blob) => {
      uploadBlob = blob
      return imageRef.put(blob, { contentType: mime })
    })
    .then(() => {
      uploadBlob.close()
      return imageRef.getDownloadURL();
    })
    .catch(err => {
      console.error('Error in uploadImage ReadFile ');
      console.error(err);
    });
}
