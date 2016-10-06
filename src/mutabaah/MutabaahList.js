import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ListView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSelected: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
  },
  content: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 10,
  },
  currentInput: {
    fontSize: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

class MutabaahList extends Component {
  static genRow(datas) {
    return datas.map(d => Object.assign({}, d, { isSelected: false }));
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ibadahs: props.dataSource,
      dataSource: ds.cloneWithRows(props.dataSource),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ibadahs: nextProps.dataSource,
      dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    });
  }

  onPressRow(d, rowId) {
    const newData = [...this.state.ibadahs];
    newData[rowId] = Object.assign({}, d, { isSelected: true });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
    });
    this.props.onPress(d, rowId);
  }

  renderRow(d, sectionId, rowId) {
    return (
      <TouchableOpacity
        onPress={() => this.onPressRow(d, rowId)}
      >
        <View style={d.isSelected ? styles.rowSelected : styles.row}>
          <Icon name={'cloud'} size={20} />
          <View style={styles.content}>
            <Text style={styles.title}>{_.startCase(d.name)}</Text>
            <Text style={styles.subtitle}>{_.startCase(d.target)}</Text>
          </View>
          <Text style={styles.currentInput}>{d.type === 'fillnumber' ? 0 : 'no'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => (
          <View key={rowId} style={styles.separator} />
        )}
      />
    );
  }
}

MutabaahList.propTypes = {
  dataSource: PropTypes.array,
  onPress: PropTypes.func,
};

export default MutabaahList;
