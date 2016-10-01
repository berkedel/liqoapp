import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FormLabel, FormInput, Button, Card } from 'react-native-elements';
import { withRouter } from 'react-router';

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
            autoCorrect={false}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            onChangeText={username => this.setState({ username })}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            returnKeyType={'next'}
            onChangeText={password => this.setState({ password })}
          />

          <FormLabel>Retype Password</FormLabel>
          <FormInput
            textInputRef={c => this.retypePassword = c}
            secureTextEntry
            returnKeyType={'done'}
            onChangeText={rePassword => this.setState({ rePassword })}
          />

          <Button
            small
            backgroundColor={'#397af8'}
            title={'Register'}
            buttonStyle={{ marginTop: 20 }}
            onPress={() => null}
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
  router: PropTypes.shape,
};

export default withRouter(RegisterPage);
