import React, { Component } from "react";
import {
  Text, View, Animated, Image as RNImage,
  Dimensions, TouchableOpacity,
  TouchableWithoutFeedback, StatusBar, Easing
} from "react-native";
import MapView from "react-native-maps";
import avatar from "../assets/avatar.jpg";
import addIcon from "../assets/add-icon.svg";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { styles, CARD_WIDTH } from './HomeScreenStyles';
import TextStyles from '../shared/styles/text';
import Image from 'react-native-remote-svg';
import checkIcon from '../assets/check.svg';
import DrawerContent from '../shared/components/DrawerContent';
import Drawer from '../shared/components/drawer';

const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get("window");

export default class HomeScreen extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: "Beyonce Tour",
        description: "3987 Owings Mills BLVD, Baltimore MD",
        dateTime: "26 April, 2018 21:00",
        image: require('../assets/Beyonce-Formation-World-Tour.jpg'),
        isFeatured: false,
      },
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Kanye West: Pablo tour XI",
        description: "3987 Owings Mills BLVD, Baltimore MD",
        dateTime: "26 April, 2018 21:00",
        image: require('../assets/kanye-west-tour.jpg'),
        isFeatured: true,
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: "Starboy World Tour",
        description: "3987 Owings Mills BLVD, Baltimore MD",
        dateTime: "26 April, 2018 21:00",
        image: require('../assets/the-weeknd.jpg'),
        isFeatured: false,
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  constructor(props) {
    super(props);
    this.handelPressIn = this.handelPressIn.bind(this);
    this.handelPressOut = this.handelPressOut.bind(this);
  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.screenLoadAnimation = new Animated.Value(0);
    this.animatedPress = new Animated.Value(1);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    Animated.timing(this.screenLoadAnimation, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.exp)
    }).start();
  }
  closeDrawer = () => {
    this.drawer.closeDrawer();
  };
  openDrawer = () => {
    this.drawer.openDrawer();
  };
  doLogout = () => {
    this.props.navigation.replace('Register');
  }
  handelPressIn() {
    Animated.spring(this.animatedPress, {
      toValue: .92
    }).start();
  }
  handelPressOut() {
    Animated.spring(this.animatedPress, {
      toValue: 1
    }).start();
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedPress }]
    };
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.75, 1, 0.75],
        extrapolate: "clamp",
      });
      const colorOpacity = this.animation.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: "clamp",
      });
      const cardScale = this.animation.interpolate({
        inputRange,
        outputRange: [.85, 1, .85],
        extrapolate: "clamp",
      });
      return { scale, opacity, colorOpacity, cardScale };
    });
    const screenInterpolations = () => {
      const opacity = this.screenLoadAnimation.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0, 1],
      });
      const opacity2 = this.screenLoadAnimation.interpolate({
        inputRange: [0, 0.75, 1],
        outputRange: [0, 1, 1],
      });
      const translateX = this.screenLoadAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
      });
      const translateY = this.screenLoadAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
      });
      return {opacity, translateX, translateY};
    }

    return (
      <Drawer
        content={<DrawerContent doLogout={() => this.doLogout()} />}
        ref={(ref) => { this.drawer = ref; }}>
        <Animated.View style={[ {transform: [{translateY: screenInterpolations().translateY}],
          opacity: screenInterpolations().opacity2}, styles.container]}>
          <View style={{
            position: 'absolute', top: 0, 
            height: 60 + statusBarHeight, 
            zIndex: 2, flex: 1, width, paddingHorizontal: 15, paddingTop: statusBarHeight,
            alignItems: 'center', flexDirection: 'row', justifyContent: "space-between"}} >
            <LinearGradient
              colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 100,
              }}
            />
            <TouchableOpacity onPress={this.openDrawer}>
              <Ionicons name="ios-menu" size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ios-search" size={30} />
            </TouchableOpacity>
          </View>

          <MapView
            ref={map => this.map = map}
            initialRegion={this.state.region}
            style={styles.mapView}
          >
            {this.state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };
              const colorOpacityStyle = {
                opacity: interpolations[index].colorOpacity,
              };
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={[styles.marker]} />
                    <Animated.View style={[styles.markerActive, colorOpacityStyle]} />
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>

          <View style={styles.scrollView}>
            <TouchableWithoutFeedback>
              <View style={{backgroundColor: '#F23434', width: 45, height: 45, borderRadius: 22.5, position: 'absolute',
                right: 15, marginTop: -22, alignItems: 'center', justifyContent: 'center',
                shadowColor: 'black', shadowOffset: {width: 0, height: 5}, shadowOpacity: .15}} >
                <Image source={addIcon} style={{height: "75%", width: "75%", alignSelf: 'center',}} />
              </View>
            </TouchableWithoutFeedback>

            <View style={{height: 90, flexDirection: 'row', padding: 15, alignItems: "center", paddingBottom: 30}}>
              <View style={{flex: 0.5, backgroundColor: '#efefef', height: 45, width: 45,
                borderRadius: 22, overflow: "hidden", marginRight: 15}}>
                <RNImage source={avatar} style={{height: "100%", width: "100%"}} />
              </View>
              <View style={{flex: 3}}>
                <Text style={[TextStyles.titleText]}>Welcome Thomas</Text>
                <Text style={[
                  TextStyles.captionText,
                  TextStyles.fadedText]} >Find out what's happening around you.</Text>
              </View>
            </View>

            <Animated.ScrollView
              style={{flex: 1, overflow: 'visible', 
              opacity: screenInterpolations().opacity,
              transform: [{translateX: screenInterpolations().translateX}]}}
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              snapToAlignment="start"
              decelerationRate="fast"
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              contentContainerStyle={[styles.endPadding, styles.startPadding]}
            >
              {this.state.markers.map((marker, index) => {
                const cardScaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].cardScale,
                    },
                  ],
                };
                return (
                  <TouchableWithoutFeedback onPressIn={this.handelPressIn} onPressOut={this.handelPressOut} key={index}>
                    <Animated.View style={animatedStyle} >
                      <Animated.View style={[styles.card, cardScaleStyle ]}>
                        <View style={styles.cardImage}>
                          <RNImage source={marker.image} style={{flex: 1, width: '100%', height: '100%'}} resizeMode="cover" />
                        </View>
                        <View style={styles.textContent}>
                          <Text numberOfLines={1} style={[TextStyles.bodyText]}>{marker.title}</Text>
                          <Text numberOfLines={1} style={[
                            TextStyles.captionText, TextStyles.fadedText, {paddingBottom: 15}]}>{marker.description}</Text>
                          <Text numberOfLines={1} style={[
                            TextStyles.smallText, TextStyles.fadedText]}>{marker.dateTime}</Text>
                          {marker.isFeatured &&
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
              })}
            </Animated.ScrollView>
          </View>

        </Animated.View>
      </Drawer>
    );
  }
}
