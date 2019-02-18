import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../config/aws-exports';
import { sendCode, confirmForgotPwdSubmit, closeToResendForgotPwd } from '../actions/auth'

Amplify.configure({ Auth: awsConfig });

const styles = require('./LoginStyles');

const initialState = {
  phone: '',
  code: '',
  password: '',
  errorMessage: '',
  modalErrorMessage: ''
}

class ForgotPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  forgotPwd = () => {
    this.setState({ errorMessage: '' })
    if (this.state.phone == '')
      this.setState({ errorMessage: 'Phone number cannot be blank.' })
    else {
      const phone = this.state.phone;
      this.props.dispatchSendCode(phone);
      console.log("forgotPwd state: ", this.state);
    }
    /* Auth.forgotPassword(this.state.phone)
      .then(() => {
        this.setState({ showForgotPwdConfirmModal: 'true' })
      })
      .catch(err => { this.setState({ errorMessage: err.message }) }); */
  };

  resend = () => {
    this.props.dispatchCloseToResendForgotPwd();
  }

  confirmForgotPwdSubmit = () => {
    this.setState({ modalErrorMessage: '' })
    if (this.state.phone == '')
      this.setState({ modalErrorMessage: 'Phone number cannot be blank.' })
    else if (this.state.code == '')
      this.setState({ modalErrorMessage: 'Confirmation code cannot be blank.' })
    else if (this.state.password == '')
      this.setState({ modalErrorMessage: 'Password cannot be blank.' })
    else {
      const { phone, code, password } = this.state;
      this.props.dispatchConfirmForgotPwd(phone, code, password);
      console.log("confirmForgotPwdSubmit state: ", this.state);
    }
    /* Auth.forgotPasswordSubmit(this.state.phone, this.state.code, this.state.password)
      .then(() => {
        this.props.navigation.navigate('LoginScreen')
      })
      .catch(err => {
        this.setState({ errorMessage: err.message })
      }); */
  };

  render() {
    const { auth: {
      showForgotPwdConfirmModal,
      isAuthenticating,
      forgotPwdError,
      forgotPwdErrorMessage,
      confirmForgotPwdError,
      confirmForgotPwdErrorMessage
    } } = this.props
    return (
      <KeyboardAvoidingView
        style={styles.fullSize}
        behavior="padding"
      >
        <ScrollView
          contentContainerStyle={styles.signin_container}
          keyboardShouldPersistTaps='never'
          scrollEnabled={true}>
          <View style={styles.headContainer}>
            <Image
              source={
                require('../assets/images/wingman.png')
              }
              style={styles.headImage}
            />
          </View>
          <View style={styles.signin_form_container}>
            <Text style={styles.signin_banner_text}>
              Trouble logging in?
          </Text>
            <Text style={{ textAlign: 'center' }}>
              Please enter your phone number and we will send you a code to get back to your account.
          </Text>
            <Text style={[forgotPwdError && styles.signin_info]}>
              {forgotPwdErrorMessage}
            </Text>
            <Text style={styles.signin_info}>
              {this.state.errorMessage}
            </Text>
            <TextInput
              style={styles.signin_input}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              placeholder="PHONE"
              autoCapitalize="none"
              keyboardType="phone-pad"
              underlineColorAndroid="#fff"
            />
            <Button buttonStyle={{ backgroundColor: "#4a90e2" }}
              title="Send code"
              onPress={this.forgotPwd.bind(this)} />
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} >
              <Text style={styles.signup_link}>
                GO BACK
                </Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType={'none'}
              visible={showForgotPwdConfirmModal}
              onRequestClose={() => { console.log('close modal') }}>
              <View style={styles.modalBackground}>
                <View style={styles.viewInModal}>
                  <Text style={styles.signin_banner_text}>
                    Reset your password
                  </Text>
                  <Text style={[confirmForgotPwdError && styles.signin_info]}>
                    {confirmForgotPwdErrorMessage}
                  </Text>
                  <Text style={styles.signin_info}>
                    {this.state.modalErrorMessage}
                  </Text>
                  <TextInput
                    style={styles.signin_input}
                    value={this.state.phone}
                    placeholder="PHONE NUMBER"
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    underlineColorAndroid="#fff"
                    editable={false}
                  />
                  <TextInput
                    style={styles.signin_input}
                    onChangeText={(code) => this.setState({ code })}
                    placeholder="CONFIRMATION CODE"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    underlineColorAndroid="#fff"
                  />
                  <TextInput
                    style={styles.signin_input}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder="PASSWORD"
                    autoCapitalize="none"
                    onFocus={() => {
                      this.setState({ modalErrorMessage: "Passwords must contain symbols, uppercase and at least 8 characters length" })
                    }}
                    secureTextEntry={true}
                    underlineColorAndroid="#fff"
                  />
                  <Button
                    onPress={this.confirmForgotPwdSubmit.bind(this)}
                    title="Submit"
                    isLoading={isAuthenticating}
                    buttonStyle={{ backgroundColor: "#4a90e2" }}
                  />
                  <TouchableOpacity onPress={this.resend.bind(this)}>
                    <Text style={styles.signup_link}>
                      Check number and resend code?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchSendCode: (phone) => sendCode(phone),
  dispatchConfirmForgotPwd: (phone, code, password) => confirmForgotPwdSubmit(phone, code, password),
  dispatchCloseToResendForgotPwd: () => closeToResendForgotPwd()
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
