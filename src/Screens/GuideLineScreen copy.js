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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import myTheme from '../../styles/theme.style';

const GuidelineScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>Good Morning</Text>
        <Feather
          name={'sun'}
          size={30}
          color={'white'}
          style={styles.mainHeadingIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mainHeadingContainer: {
    backgroundColor: myTheme.PRIMARY_COLOR2,
    borderBottomLeftRadius: wp('10%'),
    flexDirection: 'row',
  },
  mainHeadingIcon: {
    marginTop: hp('6%'),
    marginBottom: hp('3%'),
  },
  mainHeading: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('7%'),

    // textAlign: 'center',
    fontSize: wp('7%'),
    color: 'white',
  },
});

export default GuidelineScreen;
