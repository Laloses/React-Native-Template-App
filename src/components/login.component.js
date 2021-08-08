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
  componentDidMount = async () => {
    await this.isStayLoged();
  };
  isStayLoged = async () => {
    try {
      this.props.handleLoading(true);
      let stayLogedJSON = JSON.parse(await AsyncStorage.getItem('stayLoged'));
      if (stayLogedJSON && stayLogedJSON.value === true) {
        this.setState({
          ...this.state,
          userInput: stayLogedJSON.user,
          passInput: stayLogedJSON.pass,
          stayLoged: true,
        });
        await this.handleLogIn();
      }
      this.props.handleLoading(false);
    } catch (error) {
      console.log('error en isStayLoged', error);
    }
  };
  handleLogIn = async () => {
    try {
      this.props.handleLoading(true);
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
        //Verficar si mantiene sesion
        if (this.state.stayLoged) {
          //Guardar datos de sesión
          await AsyncStorage.setItem(
            'stayLoged',
            JSON.stringify({
              value: true,
              user: this.state.userInput,
              pass: this.state.passInput,
            }),
          );
        }
        //Termina la carga
        this.props.handleLoading(false);
        //Cambiamos el status de logeo de la app, y guardamos la info
        this.props.handleLogedStatus(true, res);
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
          value={this.state.userInput || ''}
        />
        <Text>Contraseña</Text>
        <TextInput
          textContentType="password"
          style={MainStyles.input}
          onChangeText={this.hanldePassInput}
          placeholder="Mi contraseña"
          value={this.state.passInput || ''}
        />
        <Text>Mantener sesión.</Text>
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
