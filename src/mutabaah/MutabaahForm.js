import React, { PropTypes } from 'react';
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

const MutabaahForm = ({ style, type, onLeftClick, onRightClick }) => {
  let leftButton = <Icon name={'arrow-down'} size={20} color={'white'} />;
  let rightButton = <Icon name={'arrow-up'} size={20} color={'white'} />;
  if (type === 'yesno') {
    leftButton = <Icon name={'times'} size={20} color={'white'} />;
    rightButton = <Icon name={'check'} size={20} color={'white'} />;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputLeft}>
        <TouchableOpacity onPress={onLeftClick}>
          {leftButton}
        </TouchableOpacity>
      </View>
      <View style={styles.inputRight}>
        <TouchableOpacity onPress={onRightClick}>
          {rightButton}
        </TouchableOpacity>
      </View>
    </View>
  );
};

MutabaahForm.propTypes = {
  style: View.propTypes.style,
  type: PropTypes.string,
  onRightClick: PropTypes.func,
  onLeftClick: PropTypes.func,
};

export default MutabaahForm;
