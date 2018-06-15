import React from 'react';
import {
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
import styles from './RegistrationScreenStyles';

export default class RegisterScreen extends React.Component {
  state = {
    registrationStep: 1,
    showLoginForm: false,
    gender: undefined,
    fontLoaded: false,
    dob: undefined,
  };
  componentWillMount() {
    this.animation = new Animated.Value(0);
    // swiping down screen should dismiss keyboard
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
  gotoRegistrationStep2 () {
    Keyboard.dismiss();
    if (this.state.registrationStep === 1) {
      Animated.timing(this.animation, {
        toValue: 100,
        duration: 300,
        easing: Easing.out(Easing.quad)
      }).start();
      this.setState({registrationStep: 2});
    } else {
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease
      }).start();
      this.setState({registrationStep: 1});
    }
  }
  showLoginForm (showLoginForm = true) {
    Keyboard.dismiss();
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 100,
      easing: Easing.ease
    }).start();
    this.setState({registrationStep: 1, showLoginForm});
  }
  doLogin() {
    this.props.navigation.replace('Home');
  }
  onDateChange(date) {
    this.setState({dob: date});
  }
  onGenderChange(gender) {
    this.setState({gender});
  }
  render() {
    const registrationStep1Props = () => {
      const opacity = this.animation.interpolate({
        inputRange: [0, 50, 100],
        outputRange: [1, 0.2, 0],
      });
      const { showLoginForm } = this.state;
      return {opacity, showLoginForm}
    };
    const formScale = this.animation.interpolate({
      inputRange: [0, 25, 100],
      outputRange: [1, .97, 1],
    });
    const registrationStep2Props = () => {
      const opacity = this.animation.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      });
      const onDateChange = this.onDateChange.bind(this);
      const onGenderChange = this.onGenderChange.bind(this);
      const { showLoginForm, registrationStep, gender, dob } = this.state;
      return { opacity, onDateChange, onGenderChange, showLoginForm, registrationStep, gender, dob };
    }
    const registrationBtnText = this.state.registrationStep === 1 ? 'Register' : 'Get started';
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusBar barStyle="light-content" />
        <RNImage style={styles.backgroundOverlay} source={backgroundOverlay} />

        {this.state.fontLoaded &&
          <View style={[styles.main]} {...this.PanResponder.panHandlers}>
            <Animated.View style={[styles.form, {transform: [{scale: formScale}]}]} >
              <RegistrationStep1 {...registrationStep1Props()} />
              <RegistrationStep2 {...registrationStep2Props()} />
            </Animated.View>
            <View style={styles.bottomArea} >
              {(() => this.state.showLoginForm ?
                <AppButton title="Log in" onPress={() => this.doLogin()} /> :
                <AppButton title={registrationBtnText} onPress={() => this.gotoRegistrationStep2()} />
              )()}

              <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {(() => this.state.showLoginForm ?
                  <TouchableOpacity style={[styles.actionBtn]} onPress={() => this.showLoginForm(false)} >
                    <Text style={[TextStyles.whiteText, TextStyles.captionText]} >Don't have an account, </Text>
                    <Text style={[TextStyles.whiteText, TextStyles.captionText, {opacity: .7}]} >Sign up</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity style={[styles.actionBtn]} onPress={() => this.showLoginForm()} >
                    <Text style={[TextStyles.whiteText, TextStyles.captionText]} >Have an account, </Text>
                    <Text style={[TextStyles.whiteText, TextStyles.captionText, {opacity: .7}]} >Log in</Text>
                  </TouchableOpacity>
                )()}
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

class RegistrationStep1 extends React.Component {
  render() {
    const opacity = this.props.opacity;
    return (
      <Animated.View style={{opacity}} >
        <TextInput
          style={[styles.formControl, {opacity: this.props.showLoginForm ? 0 : 1}]}
          enabled={!this.props.showLoginForm}
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
        <View style={{flexDirection: 'row', justifyContent: 'center', opacity: this.props.showLoginForm ? 0 : 1}} >
          <Text style={[TextStyles.captionText, TextStyles.whiteText]}>By clicking Register, you agree to our </Text>
          {!this.props.showLoginForm &&
            <TouchableOpacity>
              <Text style={[TextStyles.captionText, TextStyles.whiteText]}>terms of use</Text>
            </TouchableOpacity>
          }
        </View>
      </Animated.View>
    )
  }
}
class RegistrationStep2 extends React.Component {
  render() {
    const genderOptions = [
      {
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Female',
        value: 'Female',
      },
    ];
    const opacity = this.props.opacity;
    return (
      <Animated.View pointerEvents={this.props.registrationStep === 2 ? 'auto' : 'none'}
        style={{opacity, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} >
        <Text style={[TextStyles.whiteText, TextStyles.headingText]} >Birthday tickets on us?</Text>
        <Text style={[TextStyles.whiteText, TextStyles.headingText, {paddingBottom: 75}]} >Why not...</Text>

        <DatePicker
          style={{width: '100%'}}
          date={this.props.dob}
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
          onDateChange={this.props.onDateChange}
        />
        <RNPickerSelect
          placeholder={{label: 'Select gender', value: null}}
          items={genderOptions}
          onValueChange={this.props.onGenderChange}
          hideDoneBar={true}
          value={this.props.gender}
        >
          <TextInput
            style={styles.formControl}
            placeholder="Gender"
            placeholderTextColor="white"
            editable={false}
            value={this.props.gender}
          />
        </RNPickerSelect>
      </Animated.View>
    );
  }
}