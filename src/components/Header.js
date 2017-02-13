// Import libraries for making a component
import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Icon, Button } from 'react-native-elements'; // eslint-disable-line

// Make a component
const Header = (props) => {
  const { titleStyle, gridStyle, buttonStyle, viewStyle, leftColStyle, rightColStyle } = styles;

  return (
    <View style={viewStyle}>
    <Grid style={gridStyle}>
      <Col style={leftColStyle}>
        <Icon
          name='chevron-left'
          color={props.leftColor}
          size={32}
          onPress={props.onLeft}
        />
      </Col>
      <Col>
      <Text style={titleStyle}>{props.headerText}</Text>
      </Col>
      <Col style={rightColStyle}>
        <Button
          buttonStyle={buttonStyle}
          backgroundColor='transparent'
          color='#007AFF'
          title={'下一步'}
          onPress={props.onRight}
        />
      </Col>
    </Grid>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    height: 60,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.6,
    elevation: 0.6,
    position: 'relative'
  },
  gridStyle: {
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    alignSelf: 'center',
  },
  leftColStyle: {
    justifyContent: 'center',
    width: 80,
    alignItems: 'flex-start',
  },
  rightColStyle: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonStyle: {
    width: 55,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
};

Header.propTypes = {
  headerText: PropTypes.string,
  leftButtonText: PropTypes.string,
  rightButtonText: PropTypes.string,
  onRight:PropTypes.func,
  onLeft: PropTypes.function,
  leftColor: PropTypes.string,
}

// Make the component available to other parts of the app
export { Header };
