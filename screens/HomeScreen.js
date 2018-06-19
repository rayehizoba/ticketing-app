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
import { LinearGradient, BlurView } from 'expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { styles, CARD_WIDTH } from './HomeScreenStyles';
import TextStyles from '../shared/styles/text';
import Image from 'react-native-remote-svg';
import checkIcon from '../assets/check.svg';
import DrawerContent from '../shared/components/DrawerContent';
import Drawer from '../shared/components/drawer';

const statusBarHeight = getStatusBarHeight();
const { width, height } = Dimensions.get("window");
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const renderToolbar = (openDrawer) => {
  return (
    <View style={{
      position: 'absolute', top: 0, height: 60 + statusBarHeight, 
      zIndex: 2, flex: 1, width, paddingHorizontal: 15, paddingTop: statusBarHeight,
      alignItems: 'center', flexDirection: 'row', justifyContent: "space-between"
    }} >
      <LinearGradient
        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
        style={{position: 'absolute', left: 0, right: 0, top: 0, height: 100}}
      />
      <TouchableOpacity onPress={openDrawer}>
        <Ionicons name="ios-menu" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="ios-search" size={30} />
      </TouchableOpacity>
    </View>
  );
}
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
    isDisplayEvent: false,
    visibleEvent: undefined,
    scale: new Animated.Value(1),
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.screenLoadAnimation = new Animated.Value(0);
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
      duration: 900,
      easing: Easing.out(Easing.exp)
    }).start();
  }
  closeDrawer = () => {
    this.drawer.closeDrawer();
  }
  openDrawer = () => {
    this.drawer.openDrawer();
  }
  doLogout = () => {
    this.props.navigation.replace('Register');
  }
  showEvent = evt => {
    setTimeout(() => {
      this.setState({isDisplayEvent: true, visibleEvent: evt});
      Animated.spring(this.state.scale, {
        toValue: .95
      }).start();
    }, 100);
  }
  beforeHideEvent = () => {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad)
    }).start();
  }
  hideEvent = () => {
    this.setState({isDisplayEvent: false, visibleEvent: undefined});
  }
  render() {
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
        outputRange: [.5, 1],
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
        <Animated.View style={[
          {transform: [{translateY: screenInterpolations().translateY}],
          opacity: screenInterpolations().opacity}, styles.container]}>
          {renderToolbar(this.openDrawer)}

          <Animated.View style={{flex: 1, transform: [{scale: this.state.scale}]}} >
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
                style={{flex: 1, overflow: 'visible', opacity: screenInterpolations().opacity,
                transform: [{translateX: screenInterpolations().translateX}]}}
                horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH} snapToAlignment="start" decelerationRate="fast"
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
                {this.state.markers.map((mapMarker, index) => {
                  const scale = interpolations[index].cardScale;
                  const onShowEvent = this.showEvent;
                  const props = {scale, mapMarker, onShowEvent};
                  return <EventCard key={index} {...props} />;
                })}
              </Animated.ScrollView>
            </View>
          </Animated.View>

          {this.state.isDisplayEvent && <EventView event={this.state.visibleEvent}
            beforeCloseEvent={this.beforeHideEvent}
            onCloseEvent={this.hideEvent} />}
        </Animated.View>

      </Drawer>
    );
  }
}
class EventCard extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y
    }, () => console.log(this.state));
  }
  componentWillMount() {
    this.animatedPress = new Animated.Value(1);
  }
  componentDidMount() {
    this.view.measureInWindow((x, y, width, height) => {
      console.log(x, y, width, height)
    });
  }
  handlePressIn() {
    // Animated.spring(this.animatedPress, {
    //   toValue: .92
    // }).start();
  }
  handlePressOut() {
    // Animated.spring(this.animatedPress, {
    //   toValue: 1
    // }).start();
  }
  handlePress() {
    // console.log(this.state);
    this.props.onShowEvent(this.state);
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedPress }]
    };
    const cardScaleStyle = {
      transform: [
        {
          scale: this.props.scale
        }
      ],
    };

    return (
      <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}
        onPress={this.handlePress}>
        <Animated.View style={[animatedStyle]} >
          <Animated.View style={[styles.card, cardScaleStyle ]} onLayout={this.onLayout}
            ref={view => this.view = view} >
            {/* delete me */}
            <View style={{position: 'absolute', width: '100%', height: '100%',
             backgroundColor: 'blue', zIndex: 10, borderRadius: 6}} />


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
class EventView extends React.Component {
  state = {
    blurIntensity: new Animated.Value(0),
    top: new Animated.Value(height-190),
    left: new Animated.Value(30),
    width: new Animated.Value(this.props.event.width),
    height: new Animated.Value(this.props.event.height),
    borderRadius: new Animated.Value(6),
    opacity: new Animated.Value(0),
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    Animated.spring(this.state.opacity, {toValue: 1}).start();
    Animated.timing(this.state.blurIntensity, {
      toValue: 100,
      duration: 300,
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic)
      }).start();
      Animated.timing(this.state.left, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic)
      }).start();
      Animated.timing(this.state.width, {
        toValue: width,
        duration: 300,
        easing: Easing.out(Easing.cubic)
      }).start();
      Animated.timing(this.state.height, {
        toValue: height,
        duration: 300,
        easing: Easing.out(Easing.cubic)
      }).start();
      Animated.timing(this.state.borderRadius, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic)
      }).start();
    }, 100);
    console.log(this.props.event);
  }
  closeEvent() {
    this.props.beforeCloseEvent();
    Animated.timing(this.state.blurIntensity, {
      toValue: 0,
      duration: 350,
    }).start();
    Animated.timing(this.state.top, {
      toValue: height-190,
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    }).start();
    Animated.timing(this.state.left, {
      toValue: 30,
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    }).start();
    Animated.timing(this.state.width, {
      toValue: 220,
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    }).start();
    Animated.timing(this.state.height, {
      toValue: 165,
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    }).start();
    Animated.timing(this.state.borderRadius, {
      toValue: 6,
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    }).start(() => {
      this.props.onCloseEvent();
    });
  }
  render() {
    return (
      <AnimatedBlurView style={{flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        intensity={this.state.blurIntensity} >
        <TouchableWithoutFeedback onPress={() => this.closeEvent()} >
          <Animated.View style={{position: 'absolute', top: this.state.top, left: this.state.left,
            width: this.state.width, height: this.state.height, backgroundColor: 'blue',
            borderRadius: this.state.borderRadius, shadowColor: "#000", shadowRadius: 15,
            shadowOpacity: .15, shadowOffset: { x: 15, y: -15 }, opacity: this.state.opacity}} >
          </Animated.View>
        </TouchableWithoutFeedback>
      </AnimatedBlurView>
    );
  }
}