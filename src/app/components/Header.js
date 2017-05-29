import React, { PropTypes } from 'react';
import { Text, View, Platform, Image } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Icon, Button } from 'react-native-elements';

const styles = {
  viewStyle: {
    ...Platform.select({
      ios:{
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
      android:{
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        height: 50,
        paddingTop: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.1 },
        shadowOpacity: 0.6,
        elevation: 0.6,
        position: 'relative'
      }
    }),
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
  logoColStyle:{
    //justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'column',
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const showHeader = (props) => {

}

// Make a component
const Header = (props) => {
  const { titleStyle, gridStyle, buttonStyle, viewStyle, leftColStyle, rightColStyle, logoColStyle } = styles;
  let { leftIconName, leftColor, disableRight, disableLeft, onLeft, rightColor, onRight } = props;
  const { headerText, rightButtonText, headerImage } = props;
  if(!leftColor) leftColor = 'transparent';
  if(!rightColor) rightColor = 'transparent';
  if(!onLeft) onLeft = () => {};
  if(!onRight) onRight = () => {};
  if(!leftIconName) leftIconName = 'chevron-left';
  const showHeader = () => {
    if(headerText){
      return(
        <Text style={titleStyle}>{headerText}</Text>
      );
    }else if(headerImage){
      return(
        <View>
        <Image
          style={{maxWidth:100, maxHeight: 30}}
          source={require('hookup/src/images/MeeqLogo.png')}
        />
        </View>
      );
    };
  };

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
      <Col style={logoColStyle}>
      {showHeader()}
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

Header.propTypes = {
  headerText: PropTypes.string,
  rightButtonText: PropTypes.string,
  rightColor:PropTypes.string,
  onRight:PropTypes.func,
  onLeft: PropTypes.func,
  leftColor: PropTypes.string,
  //headerImage: PropTypes.bool,
}


// Make the component available to other parts of the app
export { Header };
