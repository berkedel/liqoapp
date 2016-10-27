import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import { withRouter } from 'react-router';
import { client } from '../util/client';
import { authToken } from '../util/authToken';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
  linkColor: { color: 'red' },
  footerLayout: { margin: 20, flexDirection: 'row' },
});

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    const { router } = this.props;
    authToken.getSessionToken()
      .then((token) => {
        if (token) {
          router.replace('/dashboard');
        }
      });
  }

  render() {
    const { router } = this.props;

    return (
      <View
        style={styles.container}
      >
        <Card title={'LOGIN'}>

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
            returnKeyType={'done'}
            onChangeText={password => this.setState({ password })}
          />

          <Button
            disabled={this.state.disabled}
            small
            backgroundColor={'#397af8'}
            title={'Login'}
            buttonStyle={{ marginTop: 20 }}
            onPress={() => {
              this.setState({ disabled: true });
              const { username, password } = this.state;
              client.login({ username, password })
                .then((res) => {
                  this.setState({ disabled: false });

                  if (res.status === 200) {
                    authToken.getSessionToken()
                      .then((token) => {
                        if (token) {
                          router.replace('/dashboard');
                        }
                      });
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
            <Text>Do not have an account?</Text>
            <TouchableOpacity
              style={{ marginLeft: 4 }}
              onPress={() => router.replace('/register')}
            >
              <Text style={styles.linkColor}>Register</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

LoginPage.propTypes = {
  router: PropTypes.object,
};


export default withRouter(LoginPage);
