// Import libraries for making a component
import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

// Make a component
const MainHeader = (props) => {
  const { titleStyle, gridStyle, viewStyle, leftColStyle, rightColStyle } = styles;
  let { headerText, renderLeft, renderRight, } = props;
  if(!renderLeft) renderLeft = () => {};
  if(!renderRight) renderRight = () => {};
  // if(!onLeft) onLeft = () => {};
  // if(!onRight) onLeft = () => {};

  return (
    <View style={viewStyle}>
    <Grid style={gridStyle}>
      <Col style={leftColStyle}>
        {renderLeft}
      </Col>
      <Col>
      <Text style={titleStyle}>{headerText}</Text>
      </Col>
      <Col style={rightColStyle}>
        {renderRight}
      </Col>
    </Grid>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#efeff2',
    alignItems: 'center',
    height: 60,
    paddingTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    elevation: 1,
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
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  rightColStyle: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 90,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
};

MainHeader.propTypes = {
  headerText: PropTypes.string,
  renderRight: PropTypes.object,
  renderLeft: PropTypes.object,
  // onLeft: PropTypes.func,
  // onRight: PropTypes.func,
}

// Make the component available to other parts of the app
export { MainHeader };
