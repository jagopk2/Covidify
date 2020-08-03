import {
  AppRegistry,
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {setHomeLocation} from '../actions';

const MapComponent = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{height: 300, width: 300}}
        region={{
          latitude: location ? location.coords.latitude : 24.860735,
          longitude: location ? location.coords.longitude : 67.001137,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}>
        {location ? (
          <Marker
            coordinate={location.coords}
            title={'location'}
            description={'My Location'}
          />
        ) : null}
      </MapView>
      <Button
        title={'Get Location'}
        onPress={async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted == 'granted') {
            Geolocation.getCurrentPosition(async (location) => {
              console.log(location);
              if (location) {
                await AsyncStorage.setItem(
                  'homeLocation',
                  JSON.stringify(location),
                );
                dispatch(setHomeLocation(location));
              }
            });
          } else {
            console.log('Please give permission');
          }
        }}
      />
      <Text>This is the Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default MapComponent;
