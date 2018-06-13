import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image as RNImage,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  PanResponder,
  Animated,
  Easing
} from 'react-native';
import TextStyles from '../shared/styles/text';
import AppButton from "../shared/components/button";
import backgroundOverlay from '../assets/background-overlay.png'
import helpIcon from '../assets/help-icon.svg'
import Image from 'react-native-remote-svg';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Font } from 'expo';

export default class RegisterScreen extends React.Component {
  state = {
    step: 1,
    date: undefined,
    gender: undefined,
    genderOptions: [
      {
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Female',
        value: 'Female',
      },
    ],
    fontLoaded: false,
  };

  componentWillMount() {
    this.animation = new Animated.Value(0);
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderRelease:(evt, gestureState) => {
        if (gestureState.vy >= .25) {
          Keyboard.dismiss();
        }
      }
    })
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSansRegular': require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
    });
    
    this.setState({fontLoaded: true});
  }

  gotoStep2 () {
    Keyboard.dismiss();
    if (this.state.step === 1) {
      Animated.timing(this.animation, {
        toValue: 100,
        duration: 300,
        easing: Easing.out(Easing.quad)
      }).start();
      this.setState({step: 2});
    } else {
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease
      }).start();
      this.setState({step: 1});
    }
  }

  render() {
    const step1Opacity = this.animation.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [1, 0.2, 0],
    });
    const scale = this.animation.interpolate({
      inputRange: [0, 25, 100],
      outputRange: [1, .97, 1],
    });
    const step2Opacity = this.animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusBar barStyle="light-content" />
        <RNImage style={styles.backgroundOverlay}
          source={backgroundOverlay} />

        {this.state.fontLoaded &&
          <View style={[styles.main]} {...this.PanResponder.panHandlers} onPress={() => console.log('hello')} >
            <Animated.View style={[styles.form, {transform: [{scale}]}]} >
              {/* STEP 1 */}
              <Animated.View style={{opacity: step1Opacity}} >
                <TextInput
                  style={styles.formControl}
                  placeholder="Enter name"
                  placeholderTextColor="white"
                  keyboardAppearance="dark"
                  autoCorrect={false}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.formControl}
                  placeholder="Email"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  keyboardAppearance="dark"
                  autoCapitalize="none"
                  autoCorrect={false}
                  />
                <TextInput
                  style={styles.formControl}
                  placeholder="Password"
                  placeholderTextColor="white"
                  keyboardAppearance="dark"
                  returnKeyType="done"
                  secureTextEntry={true}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                  <Text style={[TextStyles.captionText, TextStyles.whiteText]}>By clicking Register, you agree to our </Text>
                  <TouchableOpacity>
                    <Text style={[TextStyles.captionText, TextStyles.whiteText]}>terms of use</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/* STEP 2 */}
              <Animated.View pointerEvents={this.state.step === 2 ? 'auto' : 'none'}
                style={{opacity: step2Opacity, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} >
                <Text style={[TextStyles.whiteText, TextStyles.headingText]} >Birthday tickets on us?</Text>
                <Text style={[TextStyles.whiteText, TextStyles.headingText, {paddingBottom: 75}]} >Why not...</Text>

                <DatePicker
                  style={{width: '100%'}}
                  date={this.state.date}
                  mode="date"
                  placeholder="Birthday"
                  format="DD MMM, YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    placeholderText: {
                      color: 'white',
                      fontSize: 18,
                    },
                    dateText: {
                      color: 'white',
                      fontSize: 18
                    },
                    dateInput: {
                      borderTopWidth: 0,
                      borderRightWidth: 0,
                      borderLeftWidth: 0,
                      borderBottomWidth: .5,
                      borderColor: 'rgba(255, 255, 255, .4)',
                      alignItems: 'flex-start',
                      marginBottom: 45,
                    },
                    btnTextConfirm: {
                      color: '#030F29',
                      fontSize: 18,
                    },
                    btnTextCancel: {
                      opacity: 0
                    },
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
                <RNPickerSelect
                  placeholder={{
                    label: 'Select gender',
                    value: null,
                  }}
                  items={this.state.genderOptions}
                  onValueChange={(value) => this.setState({gender: value})}
                  hideDoneBar={true}
                  value={this.state.gender}
                >
                  <TextInput
                    style={styles.formControl}
                    placeholder="Gender"
                    placeholderTextColor="white"
                    editable={false}
                    value={this.state.gender}
                  />
                </RNPickerSelect>
              </Animated.View>
            </Animated.View>
            <View style={styles.bottomArea} >
              <AppButton title={this.state.step === 1 ? 'Register' : 'Get started'} onPress={() => this.gotoStep2()} />

              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity style={[styles.loginBtn]} >
                  <Text style={[TextStyles.whiteText, TextStyles.captionText]} >Have an account, </Text>
                  <Text style={[TextStyles.whiteText, TextStyles.captionText, {opacity: .7}]} >Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.helpIcon]} >
                  <Image source={helpIcon} style={{height: 30, width: 30}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
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
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingBottom: 60,
  },
  formControl: {
    height: 40,
    fontSize: 18,
    fontFamily: 'OpenSansRegular',
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
