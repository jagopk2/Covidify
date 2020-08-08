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
import {Button, ListItem, Text} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import BackgroundJob from 'react-native-background-job';
import MapComponent from '../components/map';
import myTheme from '../../styles/theme.style';

const regularJobKey = 'regularJobKey';

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>Add Location</Text>
      </View>
      <Text>This is the LocationScreen</Text>

      <MapComponent />
      <View style={styles.g3Container}>
        <Button
          title={'Start Service'}
          onPress={() => {
            BackgroundJob.schedule({
              jobKey: regularJobKey,
              period: 1000,
            });
          }}
          containerStyle={styles.g2Button}
          buttonStyle={{borderRadius: wp('20%')}}
        />
        <Button
          title={'Stop Service'}
          onPress={() => {
            BackgroundJob.cancelAll();
          }}
          containerStyle={styles.g2Button}
          buttonStyle={{
            borderRadius: wp('20%'),
            backgroundColor: myTheme.SECONDARY_COLOR1,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mainHeading: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('7%'),

    // textAlign: 'center',
    fontSize: wp('7%'),
    color: 'white',
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
  },
});

export default LocationScreen;
