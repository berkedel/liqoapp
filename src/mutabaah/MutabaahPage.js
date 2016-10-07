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
  static genRow(datas) {
    return datas.map(d => Object.assign({}, d, { value: 0 }));
  }

  constructor() {
    super();

    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);

    this.state = {
      profile: null,
      ibadahs: null,
      currentIbadah: null,
      fillType: '',
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
          const rowData = MutabaahPage.genRow(res.data);
          this.setState({
            ibadahs: rowData,
          });
        } else if (res.status === 401) {
          authToken.deleteSessionToken();
          router.push('/');
        }
      }).done();
  }

  onLeftClick() {
    if (!_.isNull(this.state.ibadahs)) {
      let currentIbadah = { ...this.state.currentIbadah };

      const ibadahs = this.state.ibadahs.map((d) => {
        const data = { ...d };
        if (data.name === currentIbadah.name) {
          if (data.type === 'fillnumber') {
            data.value -= 1;
            if (data.value < 0) data.value = 0;
          } else {
            data.value = 0;
          }

          currentIbadah = { ...data };
        }
        return data;
      });

      this.setState({ ibadahs, currentIbadah });
    }
  }

  onRightClick() {
    if (!_.isNull(this.state.ibadahs)) {
      let currentIbadah = { ...this.state.currentIbadah };

      const ibadahs = this.state.ibadahs.map((d) => {
        const data = { ...d };
        if (data.name === this.state.currentIbadah.name) {
          if (data.type === 'fillnumber') {
            data.value += 1;
          } else {
            data.value = 1;
          }

          currentIbadah = { ...data };
        }
        return data;
      });

      this.setState({ ibadahs, currentIbadah });
    }
  }

  render() {
    let listView = <Text>Loading...</Text>;
    if (!_.isNull(this.state.ibadahs)) {
      listView = (
        <MutabaahList
          dataSource={this.state.ibadahs}
          onPress={currentIbadah => this.setState({
            currentIbadah,
            fillType: currentIbadah.type,
          })}
        />
      );
    }
    return (
      <View style={styles.container}>
        <MutabaahCard
          data={this.state.currentIbadah}
          style={styles.cardContainer}
          onPressDate={() => null}
        />
        <MutabaahForm
          type={this.state.fillType}
          style={styles.formContainer}
          onRightClick={() => this.onRightClick()}
          onLeftClick={() => this.onLeftClick()}
        />
        <View style={styles.listContainer}>
          {listView}
        </View>
      </View>
    );
  }
}

MutabaahPage.propTypes = {
  router: PropTypes.object,
};

export default withRouter(MutabaahPage);
