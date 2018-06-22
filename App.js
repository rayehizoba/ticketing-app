import React from 'react';
import { Font, AppLoading, Asset, BlurView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Image as RNImage, View, ScrollView, Text,
  TouchableOpacity } from 'react-native';
import TextStyles from './shared/styles/text';
import Image from 'react-native-remote-svg';
import favIcon from './assets/fav-icon.svg';
import shareIcon from './assets/share-icon.svg';
import { RoundButton } from './shared/components/button';
import { styles } from './screens/HomeStyles';

const cacheImages = images => images.map(image => {
  if (typeof image === 'string') {
    return Image.prefetch(image);
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
});
const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

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
    return (
      <ScrollView style={{flex: 1, paddingHorizontal: 15, marginTop: 80}} >
        <Text style={[TextStyles.headingText]} >Kanye West: Pablo tour XI</Text>
        <Text style={[TextStyles.bodyText, TextStyles.fadedText]} >3547 Owins mills BLVD, Baltimore MD</Text>
        <Text style={[TextStyles.captionText, TextStyles.fadedText]} >20/05/18 21:00 - 29/05/18 03:00</Text>

        <BlurView style={{
            flexDirection: 'row', marginVertical: 10,
          }}
          intensity={100}
          tint="dark" >
          <RNImage source={require('./assets/kanye-west-tour.jpg')}
            style={{flex: 0.45, height: '100%'}} resizeMode="cover" />
          <View style={{flex: 0.55}} >
            <Text style={[TextStyles.captionText, {padding: 10, }]} >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda natus recusandae nam. Delectus dolore voluptas eum a explicabo optio sint itaque quibusdam nobis, nihil tempore culpa dolorem fuga impedit perferendis!</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',
              alignItems: 'center', padding: 5}} >
              <TouchableOpacity>
                <Text style={[TextStyles.captionText, {paddingHorizontal: 5}]} >More info</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}} >
                <TouchableOpacity style={{padding: 5}} >
                  <Image source={favIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} >
                  <Image source={shareIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>

        <View style={{flexDirection: 'row', alignItems: 'center',}} >
          <View style={{flex: 0.66, flexDirection: 'row', flexWrap: 'wrap'}} >
            <View style={{flexBasis: '50%', paddingBottom: 10}} >
              <Text style={[TextStyles.captionText, TextStyles.fadedText]} >Regular ticket</Text>
              <Text style={[TextStyles.titleText]} >$600.00</Text>
            </View>
            <View style={{flexBasis: '50%', paddingBottom: 10}} >
              <Text style={[TextStyles.captionText, TextStyles.fadedText]} >VIP ticket</Text>
              <Text style={[TextStyles.titleText]} >$1,000.00</Text>
            </View>
            <View style={{flexBasis: '50%', paddingBottom: 10}} >
              <Text style={[TextStyles.captionText, TextStyles.fadedText]} >Regular ticket</Text>
              <Text style={[TextStyles.titleText]} >$600.00</Text>
            </View>
          </View>
          <View style={{flex: 0.34,}} >
            <RoundButton title="Buy ticket" />
          </View>
        </View>

        <Text style={[TextStyles.captionText, TextStyles.fadedText, {paddingVertical: 10}]} >Guest Artists</Text>
        <ScrollView horizontal={true} style={{}} >
          <View style={{paddingRight: 15,}} >
            <RNImage source={require('./assets/drake.jpg')} style={{height: 60, width: 60, borderRadius: 30,}} />
            <Text style={[TextStyles.captionText, TextStyles.fadedText, {textAlign: 'center'}]} >Drake</Text>
          </View>
          <View style={{paddingRight: 15, width: 75}} >
            <RNImage source={require('./assets/bey.jpg')} style={{height: 60, width: 60, borderRadius: 30,}} />
            <Text style={[TextStyles.captionText, TextStyles.fadedText, {textAlign: 'center'}]} >Beyonce</Text>
          </View>
          <View style={{paddingRight: 15, width: 75}} >
            <RNImage source={require('./assets/kendrick.jpg')} style={{height: 60, width: 60, borderRadius: 30,}} />
            <Text style={[TextStyles.captionText, TextStyles.fadedText, {textAlign: 'center'}]} >Kendrick Lamar</Text>
          </View>
          <View style={{paddingRight: 15, width: 75}} >
            <RNImage source={require('./assets/chance.jpg')} style={{height: 60, width: 60, borderRadius: 30,}} />
            <Text style={[TextStyles.captionText, TextStyles.fadedText, {textAlign: 'center'}]} >Chance the Rapper</Text>
          </View>
        </ScrollView>

        <Text style={[TextStyles.captionText, TextStyles.fadedText, {paddingVertical: 10}]} >Concert Timeline</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,}} >
          <Text style={[TextStyles.bodyText]} >Chicago, Illinois</Text>
          <Text style={[TextStyles.bodyText]} >28/06/18 13:00</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,}} >
          <Text style={[TextStyles.bodyText]} >Miami, Florida</Text>
          <Text style={[TextStyles.bodyText]} >28/06/18 13:00</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,}} >
          <Text style={[TextStyles.bodyText]} >New York City</Text>
          <Text style={[TextStyles.bodyText]} >28/06/18 13:00</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,}} >
          <Text style={[TextStyles.bodyText]} >Austin, Texas</Text>
          <Text style={[TextStyles.bodyText]} >28/06/18 13:00</Text>
        </View>
      </ScrollView>
    );
  }
}
