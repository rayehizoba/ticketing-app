import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen';
import GetStartedScreen from './screens/GetStartedScreen';

const RootStack = createStackNavigator({
  Register: {
    screen: RegisterScreen
  },
  GetStarted: {
    screen: GetStartedScreen
  },
}, {
  headerMode: 'none',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}