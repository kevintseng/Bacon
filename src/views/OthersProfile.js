import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import { Card, Divider, Button, Text } from "react-native-elements";
import Carousel from "react-native-looped-carousel";
import Moment from "moment";
import { observer } from "mobx-react/native";
// import { Actions } from "react-native-router-flux";
import Reactotron from "reactotron-react-native";

const { width } = Dimensions.get("window");

@observer
export default class OthersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryAreaSize: { width, height: 320 },
      data: this.props.data,
      photos: [],
      imgLoading: false
    };
  }

  componentWillMount() {
    Reactotron.debug("Rendering Profile");
  }

  componentDidMount() {
    Reactotron.debug("Profile rendered");
    Reactotron.log(this.state.data);
    if (this.state.data.photos) {
      Reactotron.log("有photos");
      this.state.data.photos.forEach(photo => {
        Reactotron.log(photo.src.uri);
        // Image.prefetch(photo.src.uri);
      });
    } else {
      Reactotron.log("沒有photos");
    }
    // this.setState({
    //   photos:
    // });
  }

  handleGetNext = () => {
    this.props.getNext();
  };

  handleLike = () => {
    this.props.handleLike(this.state.data.uid);
  };

  render() {
    const {
      displayName,
      birthday,
      bio,
      city,
      lang,
      photoURL,
      photoVerified,
      vip,
      emailVerified,
      hobby,
      photos
    } = this.state.data;
    const age = Moment().diff(birthday, "years");
    const gender = this.state.data.gender == "m" ? "男" : "女";

    const styles = {
      imageStyle: {
        flex: 1,
        backgroundColor: "#DCDCDC",
        position: "absolute",
        width,
        height: 320
      }
    };

    return (
      <ScrollView>
        <Carousel style={this.state.galleryAreaSize} autoplay={false} bullets>
          <View style={this.state.galleryAreaSize}>
            <Image
              key="1"
              style={{
                flex: 1,
                backgroundColor: "#DCDCDC",
                position: "absolute",
                width: 375,
                height: 320
              }}
              onLoadStart={() => this.setState({ imgLoading: true })}
              onLoad={() => this.setState({ imgLoading: false })}
              source={{ uri: photoURL }}
            >
              {this.state.imgLoading &&
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <ActivityIndicator size="large" color="white" />
                </View>}
              <View
                style={{
                  flex: 1,
                  marginLeft: 10,
                  marginBottom: 20,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "center"
                }}
              >
                <Button
                  icon={{
                    name: "heart",
                    type: "evilicon",
                    color: "white",
                    size: 70
                  }}
                  backgroundColor="transparent"
                  onPress={this.handleLike}
                />
                <Button
                  icon={{
                    name: "close-o",
                    type: "evilicon",
                    color: "white",
                    size: 70
                  }}
                  backgroundColor="transparent"
                  onPress={this.handleGetNext}
                />
              </View>
            </Image>
          </View>
        </Carousel>
        <Card
          containerStyle={{
            width: this.state.galleryAreaSize.width,
            margin: 0,
            padding: 10
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text h4>{displayName}</Text>
            <Text> {age}歲, {gender}, {city}</Text>
          </View>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#6A5ACD" }}>
            會員
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            {vip ? vip : "普通會員"}
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#6A5ACD" }}>
            自介
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            {bio}
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#6A5ACD" }}>
            興趣
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            {hobby}
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#6A5ACD" }}>
            語言
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            {lang}
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#6A5ACD" }}>
            照片認證
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            {photoVerified ? "已認證" : "未認證"}
          </Text>
          <Divider style={{ marginVertical: 5 }} />
          <Text style={{ color: "#6A5ACD" }}>
            Email認證
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            {emailVerified ? "已認證" : "未認證"}
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

// <Carousel style={this.state.galleryAreaSize} autoplay={false} bullets>
//   <View style={this.state.galleryAreaSize}>
//     <Image
//       key="1"
//       style={styles.imageStyle}
//       onLoadStart={() => this.setState({ imgLoading: true })}
//       onLoad={() => this.setState({ imgLoading: false })}
//       source={photos[0].src}
//     >
//       {this.state.imgLoading &&
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "flex-end"
//           }}
//         >
//           <ActivityIndicator size="large" color="white" />
//         </View>}
//       <View
//         style={{
//           flex: 1,
//           marginLeft: 10,
//           marginBottom: 20,
//           flexDirection: "row",
//           alignItems: "flex-end",
//           justifyContent: "center"
//         }}
//       >
//         <Button
//           icon={{
//             name: "heart",
//             type: "evilicon",
//             color: "white",
//             size: 70
//           }}
//           backgroundColor="transparent"
//           onPress={() => {}}
//         />
//         <Button
//           icon={{
//             name: "close-o",
//             type: "evilicon",
//             color: "white",
//             size: 70
//           }}
//           backgroundColor="transparent"
//           onPress={this.handleGetNext}
//         />
//       </View>
//     </Image>
//   </View>
//   <View style={this.state.galleryAreaSize}>
//     <Image
//       key="2"
//       style={styles.imageStyle}
//       onLoadStart={() => this.setState({ imgLoading: true })}
//       onLoad={() => this.setState({ imgLoading: false })}
//       source={photos[1].src}
//     >
//       {this.state.imgLoading &&
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "flex-end"
//           }}
//         >
//           <ActivityIndicator size="large" color="white" />
//         </View>}
//       <View
//         style={{
//           flex: 1,
//           marginLeft: 10,
//           marginBottom: 20,
//           flexDirection: "row",
//           alignItems: "flex-end",
//           justifyContent: "center"
//         }}
//       >
//         <Button
//           icon={{
//             name: "heart",
//             type: "evilicon",
//             color: "white",
//             size: 70
//           }}
//           backgroundColor="transparent"
//           onPress={() => {}}
//         />
//         <Button
//           icon={{
//             name: "close-o",
//             type: "evilicon",
//             color: "white",
//             size: 70
//           }}
//           backgroundColor="transparent"
//           onPress={this.handleGetNext}
//         />
//       </View>
//     </Image>
//   </View>
//   <View style={this.state.galleryAreaSize}>
//     <Image
//       key="3"
//       style={styles.imageStyle}
//       onLoadStart={() => this.setState({ imgLoading: true })}
//       onLoad={() => this.setState({ imgLoading: false })}
//       source={photos[0].src}
//     >
//       {this.state.imgLoading &&
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "flex-end"
//           }}
//         >
//           <ActivityIndicator size="large" color="white" />
//         </View>}
//       <View
//         style={{
//           flex: 1,
//           marginLeft: 10,
//           marginBottom: 20,
//           flexDirection: "row",
//           alignItems: "flex-end",
//           justifyContent: "center"
//         }}
//       >
//         <Button
//           icon={{
//             name: "heart",
//             type: "evilicon",
//             color: "white",
//             size: 70
//           }}
//           backgroundColor="transparent"
//           onPress={() => {}}
//         />
//         <Button
//           icon={{
//             name: "close-o",
//             type: "evilicon",
//             color: "white",
//             size: 70
//           }}
//           backgroundColor="transparent"
//           onPress={this.handleGetNext}
//         />
//       </View>
//     </Image>
//   </View>
// </Carousel>
