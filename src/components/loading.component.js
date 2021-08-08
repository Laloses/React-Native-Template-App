import React, {Component} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

export default class LoadingComponent extends Component {
  render() {
    if (!this.props.loading) {
      return null;
    }
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator
          animating={this.props.loading}
          hidesWhenStopped={true}
          size="large"
          color="#0000ff"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    opacity: 0.5,
  },
});
