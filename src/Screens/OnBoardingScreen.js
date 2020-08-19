import {
  AppRegistry,
  Button,
  Image,
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

import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import SplashScreenMask from 'react-native-splash-screen-mask';
import myTheme from '../../styles/theme.style';

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: myTheme.PRIMARY_COLOR1,
          image: (
            <Image
              source={require('../../assets/instructions/i2.jpeg')}
              style={{height: hp('55%')}}
              resizeMode={'contain'}
            />
          ),
          title: 'Add Current Location',
          subtitle: 'Navigate to Location Screen and get and save Location',
        },
        {
          backgroundColor: myTheme.SECONDARY_COLOR1,
          image: (
            <Image
              source={require('../../assets/instructions/i1.jpeg')}
              style={{height: hp('55%')}}
              resizeMode={'contain'}
            />
          ),
          title: 'Start Service',
          subtitle: 'Start the service by pressing start button',
        },
        {
          backgroundColor: myTheme.PRIMARY_COLOR1,
          image: (
            <Image
              source={require('../../assets/instructions/i3.jpeg')}
              style={{height: hp('55%')}}
              resizeMode={'contain'}
            />
          ),
          title: 'Track Points',
          subtitle: 'Track your points and Your Overall info',
        },
        {
          backgroundColor: myTheme.SECONDARY_COLOR1,
          image: (
            <Image
              source={require('../../assets/instructions/i5.jpeg')}
              style={{height: hp('55%')}}
              resizeMode={'contain'}
            />
          ),
          title: 'Earn Badges',
          subtitle: 'You can earn badges with the help of your points',
        },
        {
          backgroundColor: myTheme.PRIMARY_COLOR1,
          image: (
            <Image
              source={require('../../assets/instructions/i4.jpeg')}
              style={{height: hp('55%')}}
              resizeMode={'contain'}
            />
          ),
          title: 'Track Activity',
          subtitle: 'You can view your activity log on Activity Screen',
        },
      ]}
      imageContainerStyles={{
        margin: 0,
        paddingBottom: 10,
      }}
      onSkip={() => {
        navigation.navigate('MyHome');
      }}
      onDone={() => {
        navigation.navigate('MyHome');
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default OnBoardingScreen;
