import React, {Component} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';

export default class PressableDrawer extends Component {
  render() {
    if (!this.props.navigation) {
      return null;
    } else {
      return (
        <Pressable onPress={() => this.props.navigation.openDrawer()}>
          <Image
            style={styles.imgIcon}
            source={require('../assets/img/sideMenuIcon.png')}
          />
        </Pressable>
      );
    }
  }
}

const styles = StyleSheet.create({
  imgIcon: {
    width: getPixelSizeForLayoutSize(12),
    height: getPixelSizeForLayoutSize(12),
    marginLeft: 10,
  },
});
