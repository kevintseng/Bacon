import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import InputField from './InputField'

const BasicInfo = (props) => {
  const { displayName, location, avatar } = props;
  return (
    <View style={{ height: 90, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
      <View style={{ flex: 0, paddingVertical: 5 }}>
        <Avatar
          large
          rounded
          icon={{type: 'user'}}
          onPress={() => console.log("Works!")}
          containerStyle={{ flex: 1 }}
          activeOpacity={0.7}
          source={{ uri: avatar }}
        />
      </View>
      <View style={{ marginLeft: 80, width: 200 }}>
        <InputField defaultValue={displayName} autoFocus />
        <InputField defaultValue={location} maxLength={30} />
      </View>
    </View>
  );
};

export { BasicInfo };
