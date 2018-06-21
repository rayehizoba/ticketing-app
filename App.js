import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { Font, AppLoading, Asset } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const cacheImages = images => images.map(image => {
  if (typeof image === 'string') {
    return Image.prefetch(image);
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
});
const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Register: {
    screen: RegisterScreen
  },
}, {
  headerMode: 'none',
});

export default class App extends React.Component {
  state = {isReady: false};
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/add-icon.svg'),
      require('./assets/my-tickets-icon.svg'),
      require('./assets/payments-icon.svg'),
      require('./assets/notifications-icon.svg'),
      require('./assets/settings-icon.svg'),
      require('./assets/avatar.jpg'),
      require('./assets/background-overlay.png'),
      require('./assets/Beyonce-Formation-World-Tour.jpg'),
      require('./assets/kanye-west-tour.jpg'),
      require('./assets/menu-header.png'),
      require('./assets/the-weeknd.jpg'),
    ]);
    const fontAssets = cacheFonts([Ionicons.font]);
    await Promise.all([...imageAssets, ...fontAssets]);
    await Font.loadAsync({
      'OpenSansRegular': require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
    });
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      );
    }
    return <RootStack />;
  }
}
