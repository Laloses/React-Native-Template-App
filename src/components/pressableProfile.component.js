import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';
import {MainStyles} from '../assets/mainstyles';
import API from '../libs/API';

export default class PressableProfile extends Component {
  state = {
    imgPath: null,
    name: null,
    LastName: null,
    referalCode: null,
    imgPhoto: null,
    userId: null,
  };
  componentDidMount = async () => {
    await this.loadUserData();
  };
  loadUserData = async () => {
    let userData = JSON.parse(await AsyncStorage.getItem('userData'));
    this.setState(
      {
        imgPath: userData.PhotoPath,
        name: userData.FirstName,
        LastName: userData.LastName,
        referalCode: userData.UserId,
        userId: userData.UserId,
      },
      async () => {
        await this.loadImgProfile();
      },
    );
  };
  loadImgProfile = async () => {
    try {
      let res = await API.instance.getUserPhoto(this.state.userId);
      this.setState({
        imgPhoto: res,
      });
    } catch (error) {
      console.log('Error al loadImgProfile', error);
    }
  };
  render() {
    const navigation = this.props.navigation || null;
    return (
      <View>
        <Pressable
          onPress={() => navigation.closeDrawer()}
          style={styles.containerRow}>
          <View style={[MainStyles.container, styles.subcontainer]}>
            <Image
              style={styles.editIcon}
              source={require('../assets/img/editIcon.png')}
            />
            <Image
              style={styles.imgProfile}
              source={
                this.state.imgPhoto || require('../assets/img/profilePhoto.png')
              }
            />
            <Text>{`${this.state.name} ${this.state.LastName}`}</Text>
            <Text>{`#${this.state.referalCode}`}</Text>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgProfile: {
    width: getPixelSizeForLayoutSize(25),
    height: getPixelSizeForLayoutSize(25),
    borderRadius: 50,
    marginHorizontal: 'auto',
  },
  containerRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subcontainer: {
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  editIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 10,
    right: 15,
  },
});
