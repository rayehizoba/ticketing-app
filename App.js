import React from 'react';
import {
  SafeAreaView, Text, View, Button,
  Dimensions, Animated, Easing, TouchableWithoutFeedback
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    isDrawerOpen: false,
  };
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  openDrawer() {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.exp)
    }).start(() => {
      this.setState({isDrawerOpen: true});
    });
  }
  closeDrawer() {
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.exp)
    }).start(() => {
      this.setState({isDrawerOpen: false});
    });
  }
  render() {
    const overlayOpacity = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5]
    });
    const drawerTranslate = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, 0]
    });
    return (
      <SafeAreaView style={{flex: 1}} >
        <Text>Main Content</Text>
        <Button title="Open side drawer" onPress={() => this.openDrawer()} />
        {/* background overlay */}
        <Animated.View pointerEvents={this.state.isDrawerOpen ? 'auto' : 'none'}
          style={{backgroundColor: 'black', opacity: overlayOpacity,
          flex: 1, position: 'absolute', width, height}} >
          <TouchableWithoutFeedback onPress={() => this.closeDrawer()}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View style={{backgroundColor: 'white', opacity: 1, flex: 1,
          position: 'absolute', width: ((80/100)*width), height,
          marginRight: ((20/100)*width),
          transform: [{translateX: 0}], shadowColor: 'black',}} >
        </Animated.View>
      </SafeAreaView>
    );
  }
}