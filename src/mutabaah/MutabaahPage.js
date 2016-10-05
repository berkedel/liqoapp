import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ListView } from 'react-native';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from '../util/client';

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
  },
  formInputRight: {
    flex: 1,
    backgroundColor: '#3BFF06',
  },
  listContainer: {
    flex: 0.60,
  },
  listRow: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  listContentTitle: {
    fontSize: 14,
  },
  listContentSubtitle: {
    fontSize: 10,
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
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
    client.getProfile()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ profile: res.data });
        }
      }).done();

    client.getIbadahList()
      .then((res) => {
        if (res.status === 200) {
          const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.setState({ ibadahs: ds.cloneWithRows(res.data) });
        }
      }).done();
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
          <View style={styles.formInputLeft} />
          <View style={styles.formInputRight} />
        </View>
        <View style={styles.listContainer}>
          {
            !_.isNull(this.state.ibadahs) ?
              <ListView
                dataSource={this.state.ibadahs}
                renderRow={d => (
                  <View style={styles.listRow}>
                    <Icon name={'cloud'} size={20} />
                    <View style={styles.listContent}>
                      <Text style={styles.listContentTitle}>{_.startCase(d.name)}</Text>
                      <Text style={styles.listContentSubtitle}>{_.startCase(d.target)}</Text>
                    </View>
                  </View>
                )}
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

export default withRouter(MutabaahPage);
