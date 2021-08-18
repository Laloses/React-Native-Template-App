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
            source={this.props.colorMode.backgroundColor ==='black'
              ? require('../assets/img/sideMenuIconWhite.png')
              : require('../assets/img/sideMenuIcon.png')
            }
          />
        </Pressable>
      );
    }
  }
}

const styles = StyleSheet.create({
  imgIcon: {
    width: getPixelSizeForLayoutSize(10),
    height: getPixelSizeForLayoutSize(10),
    marginLeft: 10,
  },
});
