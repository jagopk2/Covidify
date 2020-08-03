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
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {setHandWashPoints, setHomeLocation, setMaskPoints} from '../actions';

import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-job';
import Geolocation from '@react-native-community/geolocation';
import MapComponent from './map';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {getDistance} from 'geolib';
import store from '../store';

const regularJobKey = 'regularJobKey';
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: async (notification) => {
    console.log('ACTION:', notification.action);
    const action = notification.action;
    const tag = notification.tag;
    console.log(action, tag);
    if (tag == '2') {
      const maskPoints = await AsyncStorage.getItem('maskPoints');
      // const maskNotificationStatus = await AsyncStorage.getItem(
      //   'maskNotificationStatus',
      // );
      if (maskPoints) {
        var tmp = parseInt(maskPoints) + 10;
        await AsyncStorage.setItem('maskPoints', tmp.toString());
        // await AsyncStorage.setItem('maskNotificationStatus', 'true');
        // await AsyncStorage.setItem('handWashNotificationStatus', 'false');

        store.dispatch(setMaskPoints(tmp));
      }
    } else if (tag == '3') {
      const handWashPoints = await AsyncStorage.getItem('handWashPoints');
      // const handWashNotificationStatus = await AsyncStorage.getItem(
      //   'handWashNotificationStatus',
      // );
      if (handWashPoints) {
        var tmp = parseInt(handWashPoints) + 10;
        await AsyncStorage.setItem('handWashPoints', tmp.toString());
        // await AsyncStorage.setItem('handWashNotificationStatus', 'true');
        // await AsyncStorage.setItem('maskNotificationStatus', 'false');

        store.dispatch(setHandWashPoints(tmp));
      }
    }

    // const tag = notification.tag;
    // console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});
BackgroundJob.register({
  jobKey: regularJobKey,
  job: async () => {
    console.log(`Background Job fired!. Key = ${regularJobKey}`);
    PushNotification.getDeliveredNotifications((value) => {
      var bool = true;
      if (value.length > 0) {
        for (const val of value) {
          // console.log(val);
          console.log(val.tag);
          if (val.tag === '1') {
            bool = false;
            break;
          }
        }
      } else {
        bool = false;
      }
      if (bool) {
        callNotification();
      } else console.log('Notification is already there');
    });

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).catch((err) => console.log(err));
    if (granted == 'granted') {
      Geolocation.getCurrentPosition(async (newLoc) => {
        const location = await AsyncStorage.getItem('homeLocation');
        // console.log(newLoc);
        if (newLoc && location) {
          console.log('Real Location', location);
          console.log('dynamic newLoc', JSON.stringify(newLoc));
          var distance = getDistance(
            JSON.parse(location).coords,
            newLoc.coords,
          );
          console.log('Location Distance', distance);
          const isOutside = await AsyncStorage.getItem('isOutside');

          if (parseInt(distance) > 50 && isOutside == 'false') {
            callNotification2();
            await AsyncStorage.setItem('isOutside', 'true');
          } else if (parseInt(distance) <= 50 && isOutside == 'true') {
            callNotification3();
            await AsyncStorage.setItem('isOutside', 'false');
          }
        }
      });
    } else {
      console.log('Please give permission');
    }
  },
});

const HomePageScreen = () => {
  const location = useSelector((state) => state.location);
  const maskPoints = useSelector((state) => state.maskPoints);
  const handWashPoints = useSelector((state) => state.handWashPoints);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLoc = async () => {
      var loc = await AsyncStorage.getItem('homeLocation');
      if (loc) {
        // console.log('///', loc);
        dispatch(setHomeLocation(JSON.parse(loc)));
      }
    };
    getLoc();
  }, []);
  useEffect(() => {
    const getMaskPoints = async () => {
      var points = await AsyncStorage.getItem('maskPoints');
      if (points) {
        // console.log('///', loc);
        dispatch(setMaskPoints(parseInt(points)));
      } else {
        await AsyncStorage.setItem('maskPoints', '0');
      }
    };
    getMaskPoints();
  }, []);
  useEffect(() => {
    const getHandWashPoints = async () => {
      var points = await AsyncStorage.getItem('handWashPoints');
      if (points) {
        // console.log('///', loc);
        dispatch(setHandWashPoints(parseInt(points)));
      } else {
        await AsyncStorage.setItem('handWashPoints', '0');
      }
    };
    getHandWashPoints();
  }, []);
  useEffect(() => {
    const getIsOutside = async () => {
      var isOutside = await AsyncStorage.getItem('isOutside');
      if (!isOutside) {
        await AsyncStorage.setItem('isOutside', 'false');
      }
    };
    getIsOutside();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the HomePageScreen</Text>
      <Text>Mask Points {maskPoints}</Text>
      <Text>Hand Wash Points {handWashPoints}</Text>
      <Button
        title={'Schedule Job'}
        onPress={() => {
          BackgroundJob.schedule({
            jobKey: regularJobKey,
            period: 1000,
          });
        }}
      />
      <Button
        title={'Stop'}
        onPress={() => {
          BackgroundJob.cancelAll();
        }}
      />
      <Button
        title={'notification 2'}
        onPress={() => {
          callNotification2();
        }}
      />
      <Button
        title={'dynamic'}
        onPress={async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted == 'granted') {
            Geolocation.getCurrentPosition(async (newLoc) => {
              console.log(newLoc);
              if (newLoc) {
                console.log('dynamic newLoc', JSON.stringify(newLoc));
                console.log(
                  'Location Distance',
                  getDistance(location.coords, newLoc.coords),
                );
              }
            });
          } else {
            console.log('Please give permission');
          }
        }}
      />
    </View>
  );
};

const callNotification = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Covidify', // (optional)
    message: 'Covidify service is running', // (required)
    // actions: '["Yes", "No"]',
    invokeApp: false,
    ongoing: true,
    autoCancel: false,
    onlyAlertOnce: true,
    tag: '1',
  });
};
const callNotification2 = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Covidify', // (optional)
    message: 'Did You wear your mask?', // (required)
    actions: '["Yes", "No"]',
    invokeApp: false,
    ongoing: false,
    autoCancel: true,
    // onlyAlertOnce: true,
    tag: '2',
  });
};
const callNotification3 = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Covidify', // (optional)
    message: 'Did You Washed Your Hands?', // (required)
    actions: '["Yes", "No"]',
    invokeApp: false,
    ongoing: false,
    autoCancel: true,
    // onlyAlertOnce: true,
    tag: '3',
  });
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default HomePageScreen;
