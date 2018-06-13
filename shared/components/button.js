import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class AppButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '100%',
    borderRadius: 4
  },
  buttonText: {
    color: '#030F29',
  }
});
