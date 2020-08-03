import {
  AppRegistry,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MapComponent from './map';

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the LocationScreen</Text>
      <MapComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default LocationScreen;
