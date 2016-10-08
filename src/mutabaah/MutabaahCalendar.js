import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import Calendar from 'react-native-calendar';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 300,
    backgroundColor: '#f7f7f7',
  },
});

class MutabaahCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false,
    };
  }

  open() {
    this.calendar.open();
  }

  render() {
    const { onDateSelect } = this.props;

    return (
      <Modal
        ref={c => this.calendar = c}
        isOpen={this.state.showCalendar}
        onClosed={() => this.setState({ showCalendar: false })}
        style={styles.container}
        position={'bottom'}
      >
        <Calendar
          showControls
          dayHeadings={[
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
          ]}
          monthNames={[
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December',
          ]}
          titleFormat={'MMMM YYYY'}
          prevButtonText={'Prev'}
          nextButtonText={'Next'}
          onDateSelect={onDateSelect}
          weekStart={0}
        />
      </Modal>
    );
  }
}

MutabaahCalendar.propTypes = {
  onDateSelect: PropTypes.func,
};

export default MutabaahCalendar;
