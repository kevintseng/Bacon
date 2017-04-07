import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const { width } = Dimensions.get('window');

class EditBar extends Component {

  handleDelete = () => {
    this.props.handleDelete();
  }

  handleAddPhoto = () => {
    this.props.handleAddPhoto();
  }

  render() {
    return(
      <View style={{ alignSelf: 'center', flex:0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#424242', opacity: 0.8, width, height: 50 }}>
        <Button
          icon={{ name: 'delete', color: 'white', size: 30 }}
          backgroundColor='transparent'
          onPress={this.handleDelete}
        />
        <Button
          icon={{ name: 'add-to-photos', color: 'white', size: 30 }}
          backgroundColor='transparent'
          onPress={this.handleAddPhoto}
        />
      </View>
    );
  }
}

export { EditBar };
