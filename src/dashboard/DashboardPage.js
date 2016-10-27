import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    backgroundColor: '#345EF2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
  },
  headerProfile: {
    flexDirection: 'row',
  },
  headerProfileName: {
    color: 'white',
    paddingLeft: 4,
  },
  headerProfileLogout: {
    color: 'white',
  },
  subHeader: {
    height: 30,
    backgroundColor: '#EBEBF2',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  subHeaderTitle: {
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  gridItem: {
    flex: 1,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemLabel: {
    textAlign: 'center',
  },
  gridItemIcon: {
    alignSelf: 'center',
  },
});

const DashboardPage = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerProfile}>
        <Icon name={'user'} size={20} color={'white'} />
        <Text style={styles.headerProfileName}>Nama</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.headerProfileLogout}>Logout</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.subHeader}>
      <Text style={styles.subHeaderTitle}>Default Group: LiqoCeria</Text>
    </View>

    <View style={styles.grid}>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'calendar-check-o'}
            size={40}
            color={'#000'}
          />
          <Text style={styles.gridItemLabel}>Mutabaah</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'group'}
            size={40}
            color={'#000'}
          />
          <Text style={styles.gridItemLabel}>Group</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'calendar'}
            size={40}
          />
          <Text style={styles.gridItemLabel}>Calendar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'envelope'}
            size={40}
          />
          <Text style={styles.gridItemLabel}>Messages</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'search'}
            size={40}
            color={'#000'}
          />
          <Text style={styles.gridItemLabel}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'newspaper-o'}
            size={40}
          />
          <Text style={styles.gridItemLabel}>News</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'question'}
            size={40}
          />
          <Text style={styles.gridItemLabel}>Ask Help</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'commenting'}
            size={40}
          />
          <Text style={styles.gridItemLabel}>Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridItem}>
        <TouchableOpacity>
          <Icon
            style={styles.gridItemIcon}
            name={'cog'}
            size={40}
          />
          <Text style={styles.gridItemLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default DashboardPage;
