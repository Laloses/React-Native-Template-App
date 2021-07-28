import {StyleSheet} from 'react-native';

export const MainStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 5,
    borderRadius: 25,
    borderStyle: 'dotted',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
  },
  btn: {
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    width: 100,
  },
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
