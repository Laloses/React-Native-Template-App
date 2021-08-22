import {StyleSheet} from 'react-native';

export const MainStyles = StyleSheet.create({
  darkMode: {
    backgroundColor: 'black',
    borderColor: '#9c9c9c',
    color: '#FFFFFF',
  },
  clearMode: {
    backgroundColor: 'white',
    borderColor: '#6b6b6b',
    color: '#121212',
  },
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 25,
    borderWidth: 0.5,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
  },
  btn: {
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    width: 100,
  },
  placeholderColor: {color: '#adadad'},
  toast: {
    borderRadius: 50,
    backgroundColor: 'grey',
    color: 'white',
    maxWidth: 150,
    height: 'auto',
  },
  hidden: {
    display: 'none',
  },
});
