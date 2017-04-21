import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Icon, Button } from 'react-native-elements';

const styles = {
  viewStyle: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    height: 64,
    paddingTop: 20,
    elevation: 0.2,
    borderBottomWidth: 0.5,
    backgroundColor: '#F5F5F5',
    borderBottomColor: '#BDBDBD',
    position: 'relative',
  },
  gridStyle: {
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    alignSelf: 'center',
  },
  leftColStyle: {
    marginLeft: 5,
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
  let { leftIconName, leftColor, disableRight, disableLeft, onLeft, rightColor, onRight } = props;
  const { headerText, rightButtonText } = props;
  if(!leftColor) leftColor = 'transparent';
  if(!rightColor) rightColor = 'transparent';
  if(!onLeft) onLeft = () => {};
  if(!onRight) onRight = () => {};
  if(!leftIconName) leftIconName = 'chevron-left';

  return (
    <View style={viewStyle}>
    <Grid style={gridStyle}>
      <Col style={leftColStyle}>
        <Icon
          name={leftIconName}
          color={leftColor}
          size={28}
          onPress={onLeft}
          disabled={disableLeft}
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
          disabled={disableRight}
        />
      </Col>
    </Grid>
    </View>
  );
};

// Header.propTypes = {
//   headerText: PropTypes.string,
//   rightButtonText: PropTypes.string,
//   rightColor:PropTypes.string,
//   onRight:PropTypes.func,
//   onLeft: PropTypes.func,
//   leftColor: PropTypes.string,
// }

// Make the component available to other parts of the app
export { Header };
