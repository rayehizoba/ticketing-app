import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import TextStyles from './shared/styles/text';
import AppButton from "./shared/components/button";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.backgroundOverlay}
          source={require('./assets/background-overlay.png')} />

        <Text style={[TextStyles.captionText, TextStyles.whiteText]}>By clicking Register, you agree to our terms of use</Text>
        <AppButton title="Register" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030F29',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  backgroundOverlay: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  }
});
