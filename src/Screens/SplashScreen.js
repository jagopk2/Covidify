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

const SplashScreen = ({navigation}) => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const getShown = async () => {
      var status = await AsyncStorage.getItem('isInstructionShown');
      if (status == 'true') {
        setShown(true);
      } else {
        await AsyncStorage.setItem('isInstructionShown', 'true');
      }
    };
    getShown();
  }, []);

  return (
    <SplashScreenMask
      style={{height: hp('50%')}}
      imageSource={require('../../assets/icon3.png')}
      navigationAction={() => {
        if (shown) {
          navigation.navigate('MyHome');
        } else {
          navigation.navigate('Instructions');
        }
      }}
      duration={3000}
      backgroundStyle={{backgroundColor: 'white'}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default SplashScreen;
