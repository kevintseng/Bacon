import React from 'react';
import { View, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import InputField from './InputField'

const BasicInfo = (props) => {
  const styles = {
    container: {
      ...Platform.select({
        ios: {
          height: 90,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 10
        },
        android: {
          height: 90,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 10
        },
      }),
    },
    avatarview: {
      ...Platform.select({
        ios: {
          flex: 1,
          paddingVertical: 5
        },
        android: {
          flex: 1,
          paddingVertical: 5,
          //alignItems: 'center'
        },
      }),
    },
    inputview: {
      ...Platform.select({
        ios: {
          marginLeft: 80,
          width: 200
        },
        android: {
          marginLeft: 0,
          width: 200
        }
      })
    }
  };
  const { displayName, location, avatar } = props;
  return (
    <View style={styles.container}>
      <View style={styles.avatarview}>
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
      <View style={styles.inputview}>
        <InputField defaultValue={displayName} autoFocus />
        <InputField defaultValue={location} maxLength={30} />
      </View>
    </View>
  );
};

export { BasicInfo };
