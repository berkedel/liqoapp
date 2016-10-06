import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

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

const MutabaahCard = props => (
  <View style={[styles.container, props.style]}>
    <Text style={styles.title}>Wirid Quran</Text>
    <Text style={styles.currentInput}>0 Lembar</Text>
    <TouchableOpacity>
      <Text style={styles.date}>{moment().format('D MMMM YYYY')}</Text>
    </TouchableOpacity>
  </View>
);

MutabaahCard.propTypes = {
  style: View.propTypes.style,
};

export default MutabaahCard;
