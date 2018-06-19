import React, { Component } from "react";
import {
  Text, View, Animated, Image as RNImage,
  Dimensions, TouchableOpacity,
  TouchableWithoutFeedback, StatusBar, Easing,
  PanResponder
} from "react-native";
import MapView from "react-native-maps";
import avatar from "../assets/avatar.jpg";
import addIcon from "../assets/add-icon.svg";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, BlurView } from 'expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { styles, CARD_WIDTH } from './HomeStyles';
import TextStyles from '../shared/styles/text';
import Image from 'react-native-remote-svg';
import checkIcon from '../assets/check.svg';
import DrawerContent from '../shared/components/DrawerContent';
import Drawer from '../shared/components/drawer';

const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get("window");
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export class EventView extends React.Component {
  state = {}
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove:(evt, gestureState) => {
        let animatedValue = 1 - gestureState.dy / height;
        // if (animatedValue < 0.8) {
          
        // } else {
        // }
          this.animatedValue.setValue(animatedValue);
      },
      onPanResponderRelease:(evt, gestureState) => {
        let animatedValue = 1 - gestureState.dy / height;
        if (animatedValue >= 0.8) {
          this.openEvent(150);
        } else {
          this.closeEvent();
        }
      }
    });
  }
  componentDidMount() {
    console.log(this.props.xOffset);
    this.openEvent();
  }
  openEvent(duration = 250) {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.quad)
    }).start();
  }
  closeEvent() {
    // this.props.beforeCloseEvent();
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.quad)
    }).start(() => {
      this.props.onCloseEvent();
    });
  }
  render() {
    const borderRadius = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [6, 0]
    });
    const blurIntensity = this.animatedValue.interpolate({
      inputRange: [0, 0.25, .75, 1],
      outputRange: [0, 10, 100, 100]
    });
    const top = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.scrollViewTop, 0]
    });
    const left = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.xOffset, 0]
    });
    const _height = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.event.height, height]
    });
    const _width = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.event.width, width]
    });
    const shadowOpacity = this.animatedValue.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [.15, .25, .65]
    });
    return (
      <AnimatedBlurView style={{flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        intensity={blurIntensity} >
        {/* <TouchableWithoutFeedback onPress={() => this.closeEvent()} > */}
          <Animated.View  {...this.PanResponder.panHandlers}
            style={[{position: 'absolute', top, left,
              width: _width, height: _height, backgroundColor: 'blue',
              borderRadius, shadowColor: "#000", shadowRadius: 10,
              shadowOpacity, shadowOffset: { x: 10, y: -10 }
            }]} >
          </Animated.View>
        {/* </TouchableWithoutFeedback> */}
      </AnimatedBlurView>
    );
  }
}