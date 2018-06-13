import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  PanResponder
} from 'react-native';
import TextStyles from '../shared/styles/text';
import AppButton from "../shared/components/button";
import backgroundOverlay from '../assets/background-overlay.png'

export default class GetStartedScreen extends React.Component {
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderRelease:(evt, gestureState) => {
        if (gestureState.vy >= .25) {
          Keyboard.dismiss();
        }
      }
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusBar barStyle="light-content" />
        <Image style={styles.backgroundOverlay}
          source={backgroundOverlay} />

        <View style={styles.main} {...this.PanResponder.panHandlers} >
          <View style={styles.form} >
            <TextInput
              style={styles.formControl}
              placeholder="Enter name"
              placeholderTextColor="white"
              keyboardAppearance="dark"
              autoCorrect={false}
            />
            <TextInput
              style={styles.formControl}
              placeholder="Email"
              placeholderTextColor="white"
              keyboardType="email-address"
              keyboardAppearance="dark"
              />
            <TextInput
              style={styles.formControl}
              placeholder="Password"
              placeholderTextColor="white"
              keyboardAppearance="dark"
              returnKeyType="done"
              secureTextEntry={true}
            />
            <Text style={[TextStyles.captionText, TextStyles.whiteText, {textAlign: 'center'}]}>By clicking Register, you agree to our terms of use</Text>
          </View>
          <View style={styles.bottomArea} >
            <AppButton title="Get started" onPress={Keyboard.dismiss} />

            <TouchableOpacity style={[styles.loginBtn]} >
              <Text style={[TextStyles.whiteText, TextStyles.captionText]} >Have an account, </Text>
              <Text style={[TextStyles.whiteText, TextStyles.captionText, {opacity: .5}]} >Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030F29',
  },
  main: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  backgroundOverlay: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  form: {
    // flex: 1.75/3,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingBottom: 60,
  },
  formControl: {
    height: 40,
    fontSize: 18,
    color: 'white',
    borderBottomWidth: .5,
    borderColor: 'rgba(255, 255, 255, .4)',
    marginBottom: 30,
  },
  bottomArea: {
    flex: 1.5/3,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loginBtn: {
    flexDirection:'row'
  }
});
