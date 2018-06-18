import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export const CARD_HEIGHT = height / 4;
export const CARD_WIDTH = CARD_HEIGHT * 1.3;
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapView: {
      flex: 1.5,
      marginBottom: -5,
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      shadowColor: 'black',
      shadowRadius: 5,
      shadowOpacity: .15
    },
    startPadding: {
      paddingLeft: 30,
    },
    endPadding: {
      paddingRight: width - CARD_WIDTH,
    },
    card: {
      elevation: 2,
      backgroundColor: "#FFF",
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: .25,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      borderRadius: 5,
    },
    cardImage: {
      flex: 3,
      width: "100%",
      height: "100%",
      alignSelf: "center",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#efefef'
    },
    textContent: {
      flex: 1.5,
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 15,
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
    },
    marker: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      backgroundColor: "black",
      position: "absolute",
      borderWidth: 1,
      borderColor: "white",
    },
    markerActive: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      backgroundColor: "#80df38",
      borderWidth: 1,
      borderColor: "white",
    },
    ring: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "rgba(0,0,0, 0.1)",
      position: "absolute",
    },
    featuredLabel: {
      flexDirection: 'row',
      backgroundColor: '#030F29',
      height: 15,
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingHorizontal: 10,
      marginBottom: 5,
      marginRight: 10
    },
    featuredLabel__Icon: {
      height: 10, width: 10, marginRight: 5
    },
});