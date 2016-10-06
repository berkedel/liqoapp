import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ListView } from 'react-native';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from '../util/client';
import { authToken } from '../util/authToken';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#345EF2',
    flex: 0.32,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardTitle: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  cardCurrentInput: {
    color: 'white',
    fontSize: 34,
    textAlign: 'center',
  },
  cardDate: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    backgroundColor: '#1C80FE',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
  },
  formContainer: {
    flex: 0.08,
    maxHeight: 60,
    flexDirection: 'row',
  },
  formInputLeft: {
    flex: 1,
    backgroundColor: '#F5027F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInputRight: {
    flex: 1,
    backgroundColor: '#3BFF06',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 0.60,
  },
  listRow: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRowSelected: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
  },
  listRowContent: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  listRowTitle: {
    fontSize: 14,
  },
  listRowSubtitle: {
    fontSize: 10,
  },
  listRowCurrentInput: {
    fontSize: 20,
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

class MutabaahPage extends Component {
  static genRow(datas) {
    return datas.map(d => Object.assign({}, d, { isSelected: false }));
  }

  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
    this.onPressRow = this.onPressRow.bind(this);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      profile: null,
      ibadahs: null,
      dataSource: ds,
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
            dataSource: this.state.dataSource.cloneWithRows(rowData),
          });
        } else if (res.status === 401) {
          authToken.deleteSessionToken();
          router.push('/');
        }
      }).done();
  }

  onPressRow(d, rowId) {
    const newData = [...this.state.ibadahs];
    newData[rowId] = Object.assign({}, d, { isSelected: true });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
    });
  }

  renderRow(d, sectionId, rowId) {
    return (
      <TouchableOpacity
        onPress={() => this.onPressRow(d, rowId)}
      >
        <View style={d.isSelected ? styles.listRowSelected : styles.listRow}>
          <Icon name={'cloud'} size={20} />
          <View style={styles.listRowContent}>
            <Text style={styles.listRowTitle}>{_.startCase(d.name)}</Text>
            <Text style={styles.listRowSubtitle}>{_.startCase(d.target)}</Text>
          </View>
          <Text style={styles.listRowCurrentInput}>{d.type === 'fillnumber' ? 0 : 'no'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Wirid Quran</Text>
          <Text style={styles.cardCurrentInput}>0 Lembar</Text>
          <TouchableOpacity>
            <Text style={styles.cardDate}>{moment().format('D MMMM YYYY')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formInputLeft}>
            <TouchableOpacity>
              <Icon name={'arrow-down'} size={20} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={styles.formInputRight}>
            <TouchableOpacity>
              <Icon name={'arrow-up'} size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          {
            !_.isNull(this.state.ibadahs) ?
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={(sectionId, rowId) => (
                  <View key={rowId} style={styles.listSeparator} />
                )}
              /> :
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
