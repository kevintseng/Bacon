//TODO: 把 renderGallery拉出來變成一個component

import React, { Component } from 'react';
import { View, Dimensions, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
// import { Card, ListItem } from 'react-native-elements';
// import ImagePicker from 'react-native-customized-image-picker';
import Reactotron from 'reactotron-react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import MessageBarAlert from 'react-native-message-bar/MessageBar';
// import MessageBarManager from 'react-native-message-bar/MessageBarManager';
// import { uploadImage, resizeImage } from '../../Utils';
// import { EditBar } from '../../components';

const IMAGE_HOLDER = require('../../images/addImage.png'); //eslint-disable-line
const { width, height } = Dimensions.get('window');

const styles = {
  viewWrapper: {
    width,
  },
  container: {
      width,
      height: 200,
  },
  gallery: {
      flexDirection: 'row'
  },
  icon: {
      textAlign: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  photo: {
      flex: 1
  }
};

@observer
class Profile extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.firebase = this.props.fire;
    this.db = this.props.localdb;
    this.state = {
      size: {
          width,
          height
      },
      tip: null,
      imgLoading: false,
      gallery: [{id: 'image_holder1', src: IMAGE_HOLDER}, {id: 'image_holder2', src: IMAGE_HOLDER}],
    };

  }

  componentWillMount() {
    Reactotron.log('Rendering Profile');
    Actions.refresh({ key: 'drawer', open: false });
  }

  componentDidMount() {
    // MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    // MessageBarManager.unregisterMessageBar();
  }

  // handleDelete(msg = 'Delete Photo Pressed') {
  //   MessageBarManager.showAlert({
  //     title: 'title',
  //     message: msg,
  //     alertType: 'info',
  //     position: 'bottom',
  //   });
  // }

  // handleAddPhoto() {
  //   ImagePicker.openPicker({
  //     cropping: true,
  //     multiple: true,
  //     includeBase64: true,
  //   })
  //   .then( images => {
  //     images.forEach(async(image) => {
  //       try {
  //         const filename = await this.generatePhotoFilename(this.store.user.uid);
  //         const imageRef = this.firebase.storage().ref('userPhotos/' + this.store.user.uid).child(filename);
  //         // resizeImage(uri, width, height, mime, quality)
  //         const resizedUri = await resizeImage(image.path, 800, 800, image.mime, 100);
  //         // uploadImage(resizedUri, imageRef, image.mime)
  //         const downloadUrl = await uploadImage(resizedUri, imageRef, image.mime);
  //
  //         Reactotron.log('downloadUrl: ' + downloadUrl);
  //
  //         this.state.gallery.push(
  //           { id: filename, src: { uri: downloadUrl } }
  //         );
  //
  //         Reactotron.log(this.state.gallery);
  //       } catch (err) {
  //         Reactotron.error('Profile:handleAddPhoto: ');
  //         Reactotron.error(err);
  //       }
  //     }); //end for each
  //   })
  //   .catch( err => {
  //     Reactotron.log(err.code);
  //   });
  // }
  //
  // emailPressed = () => {
  //   this.setState({
  //     tip: '未認證'
  //   });
  // }
  //
  // generatePhotoFilename = (uid) => {
  //   const childpath = 'users/' + uid + '/photos';
  //   return this.firebase.database().ref().child(childpath).push().key;
  // }
  //
  // renderPhoto = (item) => {
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         key={item.id}
  //         resizeMode='contain'
  //         style={[styles.container, {backgroundColor: '#DCDCDC'}]}
  //         onLoadStart={() => this.setState({ imgLoading: true })}
  //         onLoad={() => this.setState({ imgLoading: false })}
  //         source={item.src}>
  //         {
  //           this.state.imgLoading && <View style={{ flex:1, width: this.state.size.width, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='white' /></View>
  //         }
  //         {
  //           !this.state.imgLoading
  //           &&
  //           <EditBar
  //             handleDelete={this.handleDelete.bind(this, item.id)}
  //             handleAddPhoto={this.handleAddPhoto.bind(this)}
  //             />
  //         }
  //       </Image>
  //     </View>
  //   );
  // }

  // renderGallery = (gallery) => {
  //   return (
  //     <ScrollView
  //       style={styles.container}
  //       horizontal
  //       >
  //       {
  //         gallery.forEach(item => {
  //           this.renderPhoto(item);
  //         })
  //       }
  //   </ScrollView>
  //   );
  // }

  render() {
    const user = this.store.user;
    // const userImg = {uri: user.photoURL};
    // const emailVerified = user.emailVerified ? {name: 'beenhere', color: 'skyblue'} : {name: 'report', color: 'orange'};

    return(
      <ScrollableTabView
        style={{marginTop: 20, }}
        renderTabBar={() => <DefaultTabBar />}>
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2'>favorite</Text>
        <Text tabLabel='Tab #3'>project</Text>
      </ScrollableTabView>

    );
  }
}

// class PhotoView extends Component {
//   constructor(props) {
//     super(props);
//     this.store = this.props.store;
//     this.firebase = this.props.fire;
//     this.db = this.props.localdb;
//     this.state = {
//       size: {
//           width,
//           height
//       },
//       tip: null,
//       imgLoading: false,
//       gallery: [{id: 'image_holder', src: IMAGE_HOLDER}],
//     };
//   }
//
//   handleAddPhoto() {
//     ImagePicker.openPicker({
//       cropping: true,
//       multiple: true,
//       includeBase64: true,
//     })
//     .then( images => {
//       images.forEach(async(image) => {
//         try {
//           const filename = await this.generatePhotoFilename(this.store.user.uid);
//           const imageRef = this.firebase.storage().ref('userPhotos/' + this.store.user.uid).child(filename);
//           // resizeImage(uri, width, height, mime, quality)
//           const resizedUri = await resizeImage(image.path, 800, 800, image.mime, 100);
//           // uploadImage(resizedUri, imageRef, image.mime)
//           const downloadUrl = await uploadImage(resizedUri, imageRef, image.mime);
//
//           Reactotron.log('downloadUrl: ' + downloadUrl);
//
//           this.props.gallery.push(
//             { id: filename, src: { uri: downloadUrl } }
//           );
//
//           Reactotron.log(this.props.gallery);
//         } catch (err) {
//           Reactotron.error('Profile:handleAddPhoto: ');
//           Reactotron.error(err);
//         }
//       }); //end for each
//     })
//     .catch( err => {
//       Reactotron.log(err.code);
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Image
//           key={this.props.item.id}
//           resizeMode='contain'
//           style={[styles.container, {backgroundColor: '#DCDCDC'}]}
//           onLoadStart={() => this.setState({ imgLoading: true })}
//           onLoad={() => this.setState({ imgLoading: false })}
//           source={this.props.item.src}>
//           {
//             this.state.imgLoading && <View style={{ flex:1, width: this.state.size.width, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size='large' color='white' /></View>
//           }
//           {
//             !this.state.imgLoading
//             &&
//             <EditBar
//               handleDelete={this.handleDelete.bind(this, this.props.item.id)}
//               handleAddPhoto={this.handleAddPhoto.bind(this)}
//               />
//           }
//         </Image>
//       </View>
//     );
//   }
// }

// <View>
//   <ScrollView style={styles.viewWrapper} contentContainerStyle={{
//   alignItems: 'center', width }}>
//     <Card
//       containerStyle={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: this.state.size.width, margin: 0, padding: 0 }}
//       wrapperStyle={{flex: 1, margin: 0, padding: 0}}
//       >
//       {
//         this.renderGallery(this.state.gallery)
//       }
//       <ListItem
//         key={user.email}
//         title='Email'
//         subtitle={user.email}
//         rightTitle={this.state.tip}
//         rightIcon={emailVerified}
//         onPress={this.emailPressed}
//         />
//     </Card>
//   </ScrollView>
//   <MessageBarAlert ref='alert' />
// </View>

export { Profile };
