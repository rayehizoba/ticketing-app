import React, { Component } from "react";
import {
  Text, View, Animated, Image as RNImage,
  Dimensions, TouchableOpacity,
  TouchableWithoutFeedback, StatusBar, Easing,
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

export class EventCard extends React.Component {
  state = {
    index: this.props.index
  };
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  }
  handlePress() {
    this.props.onShowEvent(this.state);
  }
  render() {
    const cardScaleStyle = {
      transform: [
        {
          scale: this.props.scale
        }
      ],
    };

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Animated.View >
          <Animated.View style={[styles.card, cardScaleStyle ]} onLayout={this.onLayout} >
            {/* delete me */}
            <View style={{position: 'absolute', width: '100%', height: '100%',
             backgroundColor: 'blue', zIndex: 10, borderRadius: 6}} />
             {/* delete me */}


            <View style={styles.cardImage}>
              <RNImage source={this.props.mapMarker.image} style={{flex: 1, width: '100%', height: '100%'}} resizeMode="cover" />
            </View>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={[TextStyles.bodyText]}>{this.props.mapMarker.title}</Text>
              <Text numberOfLines={1} style={[
                TextStyles.captionText, TextStyles.fadedText, {paddingBottom: 15}]}>{this.props.mapMarker.description}</Text>
              <Text numberOfLines={1} style={[
                TextStyles.smallText, TextStyles.fadedText]}>{this.props.mapMarker.dateTime}</Text>
              {this.props.mapMarker.isFeatured &&
                <View style={styles.featuredLabel} >
                  <Image source={checkIcon} style={styles.featuredLabel__Icon} />
                  <Text style={[TextStyles.smallText, TextStyles.whiteText]} >Featured</Text>
                </View>
              }
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}