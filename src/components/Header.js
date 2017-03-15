// Import libraries for making a component
import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Icon, Button } from 'react-native-elements'; // eslint-disable-line

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
    width: 100,
    alignItems: 'flex-start',
  },
  rightColStyle: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonStyle: {
    width: 90,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
};

// Make a component
const Header = (props) => {
  const { titleStyle, gridStyle, buttonStyle, viewStyle, leftColStyle, rightColStyle } = styles;
  let { leftColor, onLeft, rightColor, onRight } = props;
  const { headerText, rightButtonText } = props;
  if(!leftColor) leftColor = 'transparent';
  if(!rightColor) rightColor = 'transparent';
  if(!onLeft) onLeft = () => {};
  if(!onRight) onRight = () => {};

  return (
    <View style={viewStyle}>
    <Grid style={gridStyle}>
      <Col style={leftColStyle}>
        <Icon
          name='chevron-left'
          color={leftColor}
          size={32}
          onPress={onLeft}
        />
      </Col>
      <Col>
      <Text style={titleStyle}>{headerText}</Text>
      </Col>
      <Col style={rightColStyle}>
        <Button
          buttonStyle={buttonStyle}
          backgroundColor='transparent'
          color={rightColor}
          title={rightButtonText}
          onPress={onRight}
        />
      </Col>
    </Grid>
    </View>
  );
};

Header.propTypes = {
  headerText: PropTypes.string,
  rightButtonText: PropTypes.string,
  rightColor:PropTypes.string,
  onRight:PropTypes.func,
  onLeft: PropTypes.func,
  leftColor: PropTypes.string,
}

// Make the component available to other parts of the app
export default { Header };
