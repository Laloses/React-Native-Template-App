import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, {Component} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {MainStyles} from '../assets/mainstyles';
import API from '../libs/API';

export default class LoginComponent extends Component {
  state = {
    userInput: '',
    passInput: '',
    stayLoged: false,
  };
  handleLogIn = async () => {
    try {
      let res = await API.instance.login(
        this.state.userInput,
        this.state.passInput,
      );
      console.log('return login', res);
      //Malas credenciales
      if (typeof res === 'string') {
        this.props.handleErrorMessage(res);
      }
      //Correcto
      else if (typeof res === 'object') {
        //Quitar la contraseña de los datos guardados en la app
        if (res.hasOwnProperty('password')) {
          delete res.password;
        }
        //Cambiamos el status de logeo de la app, y guardamos la info
        this.props.handleLogedStatus(true, res);
        //Verficar si mantiene sesion
        if (this.state.stayLoged) {
          await AsyncStorage.setItem('loged', 'true');
        }
      }
    } catch (error) {
      console.log('Error al logear', error);
      alert('Error al logear', error);
    }
  };
  handleUserInput = input => {
    this.state.userInput = input;
  };
  hanldePassInput = input => {
    this.state.passInput = input;
  };
  hanldeStayLoged = input => {
    this.state.stayLoged = input;
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Usuario</Text>
        <TextInput
          style={MainStyles.input}
          onChangeText={this.handleUserInput}
          placeholder="Mi usuario"
        />
        <Text>Contraseña</Text>
        <TextInput
          textContentType="password"
          style={MainStyles.input}
          onChangeText={this.hanldePassInput}
          placeholder="Mi contraseña"
        />
        <Text>Mantener sesion.</Text>
        <CheckBox
          disabled={false}
          value={this.state.stayLoged}
          onValueChange={newValue => this.hanldeStayLoged(newValue)}
        />
        <Pressable style={MainStyles.btn} onPress={this.handleLogIn}>
          <Text>Iniciar sesión</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {...MainStyles.container, ...MainStyles.justifyCenter},
});
