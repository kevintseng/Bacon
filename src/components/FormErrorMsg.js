import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  label: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 1,
    color: 'red',
    fontSize: 12,
  }
});

const FormErrorMsg = ({children}) => (
  <View style={styles.container}>
    <Text style={[
      styles.label,
    ]}>{children}</Text>
  </View>
)

export { FormErrorMsg };
