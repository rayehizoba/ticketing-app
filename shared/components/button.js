import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const fontFamily = 'OpenSansRegular';

export default class AppButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export class RoundButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.roundButton} onPress={this.props.onPress}>
        <Text style={styles.roundButtonText} >{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const buttonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: 45,
  width: '100%',
};
const buttonTextStyle = {
  fontSize: 18,
  fontFamily,
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 4,
    ...buttonStyle
  },
  buttonText: {
    color: '#030F29',
    ...buttonTextStyle
  },
  roundButton: {
    ...buttonStyle,
    backgroundColor: '#FFD013',
    borderRadius: 30
  },
  roundButtonText: {
    color: '#030F29',
    ...buttonTextStyle,
    fontSize: 12,
  }
});
