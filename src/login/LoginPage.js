import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import { withRouter } from 'react-router';

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

  render() {
    const { router } = this.props;

    return (
      <View
        style={styles.container}
      >
        <Card title={'LOGIN'}>

          <FormLabel>Username</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            onChangeText={username => this.setState({ username })}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            returnKeyType={'done'}
            onChangeText={password => this.setState({ password })}
          />

          <Button
            small
            backgroundColor={'#397af8'}
            title={'Login'}
            buttonStyle={{ marginTop: 20 }}
            onPress={() => null}
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
  router: PropTypes.shape,
};


export default withRouter(LoginPage);
