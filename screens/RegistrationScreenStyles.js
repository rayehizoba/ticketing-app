import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#030F29',
    },
    main: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
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
    actionBtn: {
      flexDirection:'row',
      paddingVertical: 10
    }
});