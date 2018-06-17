import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { Font } from 'expo';

const RootStack = createStackNavigator({
  Register: {
    screen: RegisterScreen
  },
  Home: {
    screen: HomeScreen
  },
}, {
  headerMode: 'none',
});

export default class App extends React.Component {
  state = {fontLoaded: false};
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSansRegular': require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
    });
    this.setState({fontLoaded: true});
  }
  render() {
    return this.state.fontLoaded ? <RootStack /> : null;
  }
}