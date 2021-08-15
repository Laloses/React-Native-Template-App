import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

export default class ErrorNotify extends Component {
  colorBack = 'orange';
  render() {
    let errorProblem = this.props.errorProblem;
    if (typeof errorProblem === 'string') {
      switch (errorProblem.toLowerCase()) {
        case 'warning':
          this.colorBack = 'orange';
          break;
        case 'danger':
          this.colorBack = 'red';
          break;
        default:
          break;
      }
    }
    if (!this.props.message) {
      return null;
    }
    return (
      <Text style={[styles.boxErrorNotify, {backgroundColor: this.colorBack}]}>
        {this.props.message}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  boxErrorNotify: {
    width: '100%',
    maxHeight: 30,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
