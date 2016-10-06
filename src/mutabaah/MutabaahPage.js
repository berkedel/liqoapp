import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { client } from '../util/client';
import { authToken } from '../util/authToken';
import MutabaahForm from './MutabaahForm';
import MutabaahCard from './MutabaahCard';
import MutabaahList from './MutabaahList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 0.32,
  },
  formContainer: {
    flex: 0.08,
    maxHeight: 60,
  },
  listContainer: {
    flex: 0.60,
  },
});

class MutabaahPage extends Component {
  constructor() {
    super();

    this.state = {
      profile: null,
      ibadahs: null,
    };
  }

  componentWillMount() {
    const { router } = this.props;

    client.getProfile()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ profile: res.data });
        } else if (res.status === 401) {
          authToken.deleteSessionToken();
          router.push('/');
        }
      }).done();

    client.getIbadahList()
      .then((res) => {
        if (res.status === 200) {
          const rowData = MutabaahList.genRow(res.data);
          this.setState({
            ibadahs: rowData,
          });
        } else if (res.status === 401) {
          authToken.deleteSessionToken();
          router.push('/');
        }
      }).done();
  }

  render() {
    return (
      <View style={styles.container}>
        <MutabaahCard style={styles.cardContainer} />
        <MutabaahForm style={styles.formContainer} />
        <View style={styles.listContainer}>
          {
            !_.isNull(this.state.ibadahs) ?
              <MutabaahList dataSource={this.state.ibadahs} onPress={() => null} /> :
              <Text>Loading...</Text>
          }
        </View>
      </View>
    );
  }
}

MutabaahPage.propTypes = {
  router: PropTypes.object,
};

export default withRouter(MutabaahPage);
