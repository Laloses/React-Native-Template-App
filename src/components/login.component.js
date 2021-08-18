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
      typeof error === 'string'
        ? this.props.handleErrorMessage(error, 'warning')
        : this.props.handleErrorMessage(error, 'red');

      this.props.handleLoading(false);
      console.log('error en LoginComponent::isStayLoged', error);
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
      //Correcto
      if (typeof res === 'object') {
        //Quitar la contraseña de los datos guardados en la app
        if (res.hasOwnProperty('password')) {
          delete res.Password;
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
      //Malas credenciales
      typeof error === 'string'
        ? this.props.handleErrorMessage(error, 'warning')
        : this.props.handleErrorMessage(error, 'red');

      this.props.handleLoading(false);
      console.log('Error al logear', error);
    }
  };
  handleUserInput = input => {
    this.setState({userInput: input});
  };
  hanldePassInput = input => {
    this.setState({passInput: input});
  };
  hanldeStayLoged = input => {
    this.setState({stayLoged: input});
  };
  render() {
    return (
      <SafeAreaView style={[ this.props.colorMode, styles.container]}>
        <Text style={this.props.colorMode}>Usuario</Text>
        <TextInput
          style={[this.props.colorMode, MainStyles.input]}
          onChangeText={this.handleUserInput}
          placeholder="Mi usuario"
          placeholderTextColor={MainStyles.placeholderColor.color}
          value={this.state.userInput || ''}
        />
        <Text>Contraseña</Text>
        <TextInput
          textContentType="password"
          style={[this.props.colorMode, MainStyles.input]}
          onChangeText={this.hanldePassInput}
          placeholder="Mi contraseña"
          placeholderTextColor={MainStyles.placeholderColor.color}
          value={this.state.passInput || ''}
        />
        <Text style={this.props.colorMode}>Mantener sesión.</Text>
        <CheckBox
          tintColors={{true: this.props.colorMode.color, false:this.props.colorMode.color}} //Android
          tintColor={this.props.colorMode.color} //IOS
          onTintColor={this.props.colorMode.color} //IOS
          disabled={false}
          value={this.state.stayLoged}
          onValueChange={newValue => this.hanldeStayLoged(newValue)}
        />
        <Pressable style={[this.props.colorMode, MainStyles.btn]} onPress={this.handleLogIn}>
          <Text style={this.props.colorMode}>Iniciar sesión</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...MainStyles.container, 
    ...MainStyles.justifyCenter,
    borderRadius:0,
    margin:0
  },
});
