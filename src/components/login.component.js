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
  };
  handleLogIn = async () => {
    try {
      let res = await API.instance.login(
        this.state.userInput,
        this.state.passInput,
      );
      console.log(res);
      //Maalas credenciales
      if (typeof res === 'string') {
        this.props.handleErrorMessage(res);
      }
      //Correcto
      if (typeof res === 'object') {
        //Cambiamos el status de logeo de la app, y guardamos la info
        this.props.handleLogedStatus(true, {...res});
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
