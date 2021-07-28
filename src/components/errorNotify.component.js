import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

export default class ErrorNotify extends Component {
  render() {
    if (!this.props.message) {
      return null;
    }
    return <Text style={styles.boxErrorNotify}>{this.props.message}</Text>;
  }
}

const styles = StyleSheet.create({
  boxErrorNotify: {
    width: '100%',
    maxHeight: 30,
    backgroundColor: 'orange',
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
