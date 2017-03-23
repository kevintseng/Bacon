import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

const BasicInfoEditMode = (props) => {
  return (
    <View style={{ height: 80, flex: 1 }}>
      <Avatar
        small
        rounded
        icon={{type: 'user'}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={{flex: 2, marginLeft: 20, marginTop: 115}}
      />
    </View>
  );
};

export { BasicInfoEditMode };
