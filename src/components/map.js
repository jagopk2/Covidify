import {
  AppRegistry,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  error_message,
  info_message,
  success_message,
  warning_message,
} from '../helpers/flashMessageHelper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import {FloatingAction} from 'react-native-floating-action';
import Geolocation from 'react-native-geolocation-service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import myTheme from '../../styles/theme.style';
import {setHomeLocation} from '../actions';

const actions = [
  {
    text: 'Get Current Location',
    icon: <MaterialIcons name={'location-on'} size={25} color={'white'} />,
    name: '1',
    position: 2,
    color: myTheme.PRIMARY_COLOR1,
  },
  {
    text: 'Save Location',
    icon: <MaterialIcons name={'save'} size={25} color={'white'} />,
    name: '2',
    position: 1,
    color: myTheme.PRIMARY_COLOR1,
  },
];
const MapComponent = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.mapStyle}
        region={{
          latitude: location ? location.coords.latitude : 24.860735,
          longitude: location ? location.coords.longitude : 67.001137,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}>
        {location ? (
          <Marker
            key={Date.now().toString()}
            coordinate={location.coords}
            title={'location'}
            description={'My Location'}
            draggable={true}
          />
        ) : null}
      </MapView>
      <FloatingAction
        color={myTheme.PRIMARY_COLOR1}
        actions={actions}
        onPressItem={async (name) => {
          console.log(name);
          if (name == '1') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted == 'granted') {
              Geolocation.getCurrentPosition(
                async (location) => {
                  console.log(location);
                  if (location) {
                    success_message(
                      'Location Status',
                      'Successfully Fetched Location',
                    );
                    dispatch(setHomeLocation(location));
                  }
                },
                (err) => {
                  console.log(err);
                  error_message('Location Status', 'Error Fetching Location');
                },
                {enableHighAccuracy: true},
              );
            } else {
              error_message(
                'Location Status',
                'Please Allow Location Permission',
              );
              console.log('Please give permission');
            }
          } else {
            if (location) {
              await AsyncStorage.setItem(
                'homeLocation',
                JSON.stringify(location),
              );
              success_message(
                'Location Status',
                'Location is Successfully Saved',
              );
            } else {
              warning_message('Location Status', 'Set location first');
              console.log('Set Location First ');
            }
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    // height: hp('70%'),
    marginTop: hp('1%'),
    // borderRadius:wp("5%")
  },
  mapStyle: {
    height: hp('62%'),
    width: hp('55%'),
  },
});

export default MapComponent;
