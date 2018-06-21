import React, { Component } from "react";
import {
  Animated, Dimensions, Easing, PanResponder,
  Image
} from "react-native";
import { BlurView } from 'expo';
import { EventCard } from './HomeEventCard';

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
        let animatedValue = 1 - gestureState.dy / height * 0.8;
        if (animatedValue < 0.9) {
          this.props.beforeCloseEvent();
        } else {
          this.props.beforeCloseEvent(false);
        }
        this.animatedValue.setValue(animatedValue);
      },
      onPanResponderRelease:(evt, gestureState) => {
        let animatedValue = 1 - gestureState.dy / height;
        if (animatedValue >= 0.8) {
          this.openEvent(150);
          this.props.beforeCloseEvent(false); // reset toolbar icon colors
        } else {
          this.closeEvent();
        }
      }
    });
  }
  componentDidMount() {
    console.log(this.props.event);
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
    this.props.beforeCloseEvent();
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
    const outgoingBlurIntensity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50]
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
    const outgoingOpacity = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [1, 0, 0]
    });
    const outgoingScale = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [1, 1.2, 1.2]
    });
    const incomingOpacity = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [0, 1, 1]
    });
    return (
      <AnimatedBlurView style={{flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        intensity={blurIntensity} >
        {/* <TouchableWithoutFeedback onPress={() => this.closeEvent()} > */}
          <Animated.View  {...this.PanResponder.panHandlers}
            style={[{position: 'absolute', top, left,
              width: _width, height: _height, backgroundColor: 'white',
              borderRadius, shadowColor: "#000", shadowRadius: 10,
              shadowOpacity, shadowOffset: { x: 10, y: -10 }, overflow: 'hidden'
            }]} >
            {
              ((event) => (
                <Animated.View style={{opacity: outgoingOpacity, position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', zIndex: 2, justifyContent: 'center',
                  transform: [{scale: outgoingScale}]}}
                  pointerEvents="none" >
                  <EventCard {...event} style={{alignSelf: 'center',}} />
                  <AnimatedBlurView intensity={outgoingBlurIntensity} tint="dark" style={{position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0}} />
                </Animated.View>
              ))(this.props.event)
            }
            {renderOverlay(this.props.event.mapMarker.image, incomingOpacity)}
          </Animated.View>
        {/* </TouchableWithoutFeedback> */}
      </AnimatedBlurView>
    );
  }
}

const renderOverlay = (image, opacity) => {
  return (
    <Animated.View style={{position: 'absolute', width: '100%',height: '100%', opacity}}>
      <Animated.Image source={image} resizeMode="cover" style={{height: '100%', width: '100%',
        position: 'absolute', opacity}} />
      <BlurView intensity={100} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        tint="dark" />
    </Animated.View>
  );
}