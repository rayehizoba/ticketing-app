import React from "react";
import {
  Text, View, Animated, Image as RNImage,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from './HomeStyles';
import TextStyles from '../shared/styles/text';
import Image from 'react-native-remote-svg';
import checkIcon from '../assets/check.svg';

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
    this.props.onShowEvent &&
    this.props.onShowEvent({...this.state, ...this.props});
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
        <View>
          <Animated.View style={[styles.card, cardScaleStyle, this.props.style]} onLayout={this.onLayout} >
            {/* delete me */}
            {/* <View style={{position: 'absolute', width: '100%', height: '100%',
              backgroundColor: 'blue', zIndex: 10, borderRadius: 6}} /> */}
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}