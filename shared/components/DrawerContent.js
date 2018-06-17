import React, { Component } from "react";
import {
  Text,
  View,
  Image as RNImage,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import headerImage from '../../assets/menu-header.png';
import avatar from "../../assets/avatar.jpg";
import TextStyles from '../styles/text';
import Image from 'react-native-remote-svg';

const { width, height } = Dimensions.get("window");
const menuItems = [
  {
    title: 'My tickets',
    icon: require('../../assets/my-tickets-icon.svg')
  },
  {
    title: 'Payments',
    icon: require('../../assets/payments-icon.svg')
  },
  {
    title: 'Notifications',
    icon: require('../../assets/notifications-icon.svg')
  },
  {
    title: 'Settings',
    icon: require('../../assets/settings-icon.svg')
  },
];

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={{height, width: '100%', flex: 1, backgroundColor: 'white'}} >
        <RNImage style={{width: '100%', height: 120}} source={headerImage} />
        <RNImage style={{width: 80, height: 80, borderRadius: 40, position: 'absolute', top: (120 - 40), left: 15}} source={avatar} />
        <View style={{flex: 1, paddingLeft: 15, paddingTop: 60}} >
          <Text style={[TextStyles.titleText]} >Thomas Olamilekan</Text>
          <Text style={[TextStyles.bodyText, TextStyles.fadedText]} >Lagos, Nigeria</Text>
          <View style={{backgroundColor: '#030F29', opacity: .1, height: .7, marginVertical: 15}} />
          {menuItems.map(item => (
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}} key={item.title} >
              <Image source={item.icon} style={{height: 50, width: 50, marginRight: 15}} />
              <Text style={[TextStyles.bodyText]} >{item.title}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={this.props.doLogout} style={{padding: 15, position: 'absolute', bottom: 0, left: 0}} >
            <Text style={[TextStyles.bodyText]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}