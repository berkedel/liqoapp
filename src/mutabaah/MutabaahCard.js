import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#345EF2',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  currentInput: {
    color: 'white',
    fontSize: 34,
    textAlign: 'center',
  },
  date: {
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
});

const MutabaahCard = ({ style, data, onPressDate }) => {
  let title = '...';
  if (!_.isNull(data)) {
    title = _.startCase(data.name);
  }

  let currentInput = 'Pilih!';
  if (!_.isNull(data)) {
    if (data.type === 'yesno') {
      currentInput = data.value ? 'Yes' : 'No';
    } else {
      currentInput = `${data.value} ${_.startCase(data.unit_name)}`;
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.currentInput}>{currentInput}</Text>
      <TouchableOpacity onPress={() => onPressDate}>
        <Text style={styles.date}>{moment().format('D MMMM YYYY')}</Text>
      </TouchableOpacity>
    </View>
  );
};

MutabaahCard.propTypes = {
  style: View.propTypes.style,
  data: PropTypes.object,
  onPressDate: PropTypes.func,
};

export default MutabaahCard;
