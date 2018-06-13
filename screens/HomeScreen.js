import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  SafeAreaView,
  Button,
  Dimensions,
} from 'react-native';
import { Drawer } from 'native-base';

const {width, height} = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        panCloseMask={0.3}
        content={
          <SafeAreaView style={{height, width: '100%', backgroundColor: 'white'}} >
            <Text style={{color: 'black'}} >Hello</Text>
          </SafeAreaView>
        }
        onClose={() => this.closeDrawer()} >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />

          <Button title="open drawer" onPress={this.openDrawer} />
        </SafeAreaView>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
