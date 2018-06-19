import React from 'react';
import {
  View, Dimensions, Animated, Easing, TouchableWithoutFeedback,
  PanResponder, StatusBar
} from 'react-native';
import { isIphoneX } from '../helpers/isIphoneX';
import propTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class Drawer extends React.Component {
  state = {
    isDrawerOpen: false,
  };
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY({x: -width, y: 0});
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => {
        return (gestureState.dx !== 0);
      },
      onPanResponderMove:(evt, gestureState) => {
        if (gestureState.dx <= 0) {
          this.position.setValue({x: gestureState.dx, y: 0});
        }
      },
      onPanResponderRelease:(evt, gestureState) => {
        if (gestureState.vx <= -1) {
          this.closeDrawer();
        } else if (gestureState.dx < -100) {
          this.closeDrawer();
        } else {
          this.openDrawer();
        }
      }
    });
  }
  openDrawer() {
    this.setState({isDrawerOpen: true});
    Animated.timing(this.position, {
      toValue: {x: 0, y: 0},
      duration: 500,
      easing: Easing.out(Easing.cubic)
    }).start();
  }
  closeDrawer() {
    Animated.timing(this.position, {
      toValue: {x: -width, y: 0},
      duration: 350,
      easing: Easing.out(Easing.sin)
    }).start(() => {
      this.setState({isDrawerOpen: false});
    });
  }
  render() {
    const overlayOpacity = this.position.x.interpolate({
      inputRange: [-width, 0],
      outputRange: [0, 0.4]
    });
    return (
      <View style={{flex: 1, backgroundColor: 'black'}} >
        <StatusBar animated={true} barStyle={this.state.isDrawerOpen ? 'light-content': 'dark-content'}
          hidden={this.state.isDrawerOpen && !isIphoneX()} showHideTransition="slide" />

        {this.props.children}

        {/* background overlay */}
        <Animated.View pointerEvents="none"
          style={{backgroundColor: 'black', opacity: overlayOpacity,
          flex: 1, position: 'absolute', width, height}} >
        </Animated.View>

        {/* drawer content */}
        <Animated.View {...this.PanResponder.panHandlers}
          style={{
            flex: 1, position: 'absolute', width, height,
            transform: this.position.getTranslateTransform(),
            flexDirection: 'row',
          }} >
          <View style={{width: '75%', backgroundColor: 'white', shadowColor: 'black',
            shadowRadius: 5, shadowOpacity: .25}} >
            {this.state.isDrawerOpen && this.props.content}
          </View>
          <TouchableWithoutFeedback onPress={() => this.closeDrawer()}>
            <View style={{flex: 1, width: '25%'}} />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}
Drawer.propTypes = {
  content: propTypes.element.isRequired
}
