import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import { withRouter } from 'react-router';
import { client } from '../util/client';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
  footerLinkColor: { color: 'red' },
  footerLayout: { margin: 20, flexDirection: 'row' },
});

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      rePassword: '',
    };
  }

  render() {
    const { router } = this.props;

    return (
      <View
        style={styles.container}
      >
        <Card title={'REGISTER'} >

          <FormLabel>Username</FormLabel>
          <FormInput
            editable={!this.state.disabled}
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            onChangeText={username => this.setState({ username })}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            editable={!this.state.disabled}
            secureTextEntry
            returnKeyType={'next'}
            onChangeText={password => this.setState({ password })}
          />

          <FormLabel>Retype Password</FormLabel>
          <FormInput
            editable={!this.state.disabled}
            textInputRef={c => this.retypePassword = c}
            secureTextEntry
            returnKeyType={'done'}
            onChangeText={rePassword => this.setState({ rePassword })}
          />

          <Button
            disabled={this.state.disabled}
            small
            backgroundColor={'#397af8'}
            title={'Register'}
            buttonStyle={{ marginTop: 20 }}
            onPress={() => {
              this.setState({ disabled: true });
              const { username, password, rePassword } = this.state;

              if (password !== rePassword) {
                Alert.alert(
                  'Error',
                  'Password and retype password is not matched',
                  [{ text: 'OK' }],
                );
                this.setState({ disabled: false });
                return;
              }

              client.signup({ username, password })
                .then((res) => {
                  this.setState({ disabled: false });

                  if (res.status === 201) {
                    Alert.alert(
                      'Success',
                      'Account successfully created',
                      [{ text: 'OK', onPress: () => router.push('/') }],
                    );
                  } else {
                    Alert.alert(
                      'Error',
                      res.data,
                      [{ text: 'OK' }],
                    );
                  }
                });
            }}
          />

          <View
            style={styles.footerLayout}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity
              style={{ marginLeft: 4 }}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.footerLinkColor}>Login</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

RegisterPage.propTypes = {
  router: PropTypes.object,
};

export default withRouter(RegisterPage);
