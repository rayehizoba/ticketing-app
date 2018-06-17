import { StyleSheet } from 'react-native';

const fontFamily = 'OpenSansRegular';
const color = '#030F29';

export default styles = StyleSheet.create({
  captionText: {
    fontSize: 12,
    fontFamily,
    fontWeight: '300',
    color,
  },
  smallText: {
    fontSize: 10,
    fontFamily,
    fontWeight: '300',
    color,
  },
  headingText: {
    fontSize: 25,
    fontWeight: '300',
    lineHeight: 36,
    fontFamily,
    color,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 20,
    fontFamily,
    color,
  },
  bodyText: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily,
    color,
  },
  whiteText: {
    color: 'white',
  },
  fadedText: {
    color,
    opacity: .5
  },
});