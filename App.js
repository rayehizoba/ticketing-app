import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

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
  render() {
    return <RootStack />;
  }
}