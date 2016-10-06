import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputLeft: {
    flex: 1,
    backgroundColor: '#F5027F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRight: {
    flex: 1,
    backgroundColor: '#3BFF06',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MutabaahForm = props => (
  <View style={[styles.container, props.style]}>
    <View style={styles.inputLeft}>
      <TouchableOpacity>
        <Icon name={'arrow-down'} size={20} color={'white'} />
      </TouchableOpacity>
    </View>
    <View style={styles.inputRight}>
      <TouchableOpacity>
        <Icon name={'arrow-up'} size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  </View>
);

MutabaahForm.propTypes = {
  style: View.propTypes.style,
};

export default MutabaahForm;
