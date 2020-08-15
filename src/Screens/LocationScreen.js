import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, ListItem, Text, colors} from 'react-native-elements';
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
import BackgroundJob from 'react-native-background-job';
import MapComponent from '../components/map';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';
import myTheme from '../../styles/theme.style';

const regularJobKey = 'regularJobKey';

const LocationScreen = () => {
  // const location = useSelector((state) => state.location);

  return (
    <View style={styles.container}>
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>Add Location</Text>
        <MaterialIcons
          style={styles.mainIcon}
          name={'add-location'}
          size={30}
          color={myTheme.ICON_COLOR1}
        />
      </View>

      <MapComponent />
      <View style={styles.g3Container}>
        <Button
          title={'Start Service'}
          onPress={async () => {
            var location = await AsyncStorage.getItem('homeLocation');

            if (location) {
              BackgroundJob.schedule({
                jobKey: regularJobKey,
                period: 1000,
              });
              success_message(
                'Service Status',
                'Service will be started in few seconds',
              );
            } else {
              error_message(
                'Service Status',
                'Please add and save your location first then start service',
              );
            }
          }}
          containerStyle={styles.g2Button}
          buttonStyle={{borderRadius: wp('20%')}}
          titleStyle={{
            color: myTheme.TEXT_COLOR1,
          }}
        />
        <Button
          title={'Stop Service'}
          onPress={() => {
            BackgroundJob.cancelAll();
            PushNotification.removeAllDeliveredNotifications();
            info_message('Service Status', 'Service is Successfully Stopped');
          }}
          containerStyle={styles.g2Button}
          buttonStyle={{
            borderRadius: wp('20%'),
            backgroundColor: myTheme.SECONDARY_COLOR1,
          }}
          titleStyle={{
            color: myTheme.TEXT_COLOR1,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: myTheme.BACKGROUND_COLOR,
  },
  mainHeading: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    marginLeft: wp('7%'),
    marginRight: wp('5%'),

    // textAlign: 'center',
    fontSize: wp('7%'),
    color: myTheme.TEXT_COLOR1,
  },
  mainIcon: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  mainHeadingContainer: {
    backgroundColor: myTheme.PRIMARY_COLOR2,
    borderBottomLeftRadius: wp('10%'),
    flexDirection: 'row',
  },
  g3Container: {
    flexDirection: 'row',
    marginVertical: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  g2Button: {
    marginHorizontal: wp('2.5%'),
    width: wp('40%'),
    borderRadius: wp('10%'),
    color: myTheme.TEXT_COLOR1,
  },
});

export default LocationScreen;
