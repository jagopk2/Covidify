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

import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import {SliderBox} from 'react-native-image-slider-box';
// import ToggleBox from 'react-native-show-hide-toggle-box';
import myTheme from '../../styles/theme.style';

const images1 = [
  require('../../assets/guidelineImages/a1.png'),
  require('../../assets/guidelineImages/a2.png'),
  require('../../assets/guidelineImages/a3.png'),
];
const images2 = [
  require('../../assets/guidelineImages/b1.jpg'),
  require('../../assets/guidelineImages/b2.jpg'),
  require('../../assets/guidelineImages/b3.jpg'),
  require('../../assets/guidelineImages/b4.jpg'),
  require('../../assets/guidelineImages/b5.jpg'),
  require('../../assets/guidelineImages/b6.jpg'),
  require('../../assets/guidelineImages/b7.jpg'),
  require('../../assets/guidelineImages/b8.jpg'),
  require('../../assets/guidelineImages/b9.jpg'),
];
const images3 = [
  require('../../assets/guidelineImages/c1.png'),
  require('../../assets/guidelineImages/c2.png'),
  require('../../assets/guidelineImages/c3.png'),
  require('../../assets/guidelineImages/c4.png'),
  require('../../assets/guidelineImages/c5.png'),
  require('../../assets/guidelineImages/c6.png'),
  require('../../assets/guidelineImages/c7.png'),
];
const GuidelineScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>WHO Safety Guide Lines</Text>
        <Feather
          ImageComponent={FastImage}
          name={'book'}
          size={30}
          color={'white'}
          style={styles.mainHeadingIcon}
        />
      </View>
      <View style={styles.guidelineContainer}>
        <Text style={styles.guidelineText}>Protect yourself and others</Text>
        <SliderBox
          ImageComponent={FastImage}
          images={images1}
          ImageComponentStyle={{
            height: hp('40%'),
            width: wp('90%'),
            borderRadius: wp('5%'),
            // borderBottomRightRadius: wp('5%'),
          }}
          // borderBottomRightRadius: wp('5%'),
          disableOnPress={true}
          autoplay
          circleLoop
          resizeMode={'stretch'}
        />
      </View>
      <View style={styles.guidelineContainer}>
        <Text style={styles.guidelineText}>Be Ready</Text>
        <SliderBox
          ImageComponent={FastImage}
          images={images2}
          ImageComponentStyle={{
            height: hp('40%'),
            width: wp('90%'),
            borderRadius: wp('5%'),
            // borderBottomRightRadius: wp('5%'),
          }}
          // borderBottomRightRadius: wp('5%'),
          disableOnPress={true}
          autoplay
          circleLoop
          resizeMode={'stretch'}
        />
      </View>
      <View style={styles.guidelineContainer}>
        <Text style={styles.guidelineText}>Ask WHO</Text>
        <SliderBox
          ImageComponent={FastImage}
          images={images3}
          ImageComponentStyle={{
            height: hp('40%'),
            width: wp('90%'),
            borderRadius: wp('5%'),
            // borderBottomRightRadius: wp('5%'),
          }}
          // borderBottomRightRadius: wp('5%'),

          autoplay
          circleLoop
          disableOnPress={true}
          resizeMode={'stretch'}
        />
      </View>
      <View style={{marginTop: hp('5%')}}></View>
    </ScrollView>
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
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  mainHeading: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    marginLeft: wp('7%'),
    marginRight: wp('3%'),

    // textAlign: 'center',
    fontSize: wp('7%'),
    color: 'white',
  },
  guidelineContainer: {
    marginVertical: hp('5%'),
    width: wp('90%'),
    height: hp('40%'),
    marginHorizontal: wp('5%'),
    // backgroundColor: myTheme.PRIMARY_COLOR2,
    alignItems: 'center',
    borderRadius: wp('5%'),
    // borderTopRightRadius: wp('5%'),
  },
  guidelineText: {
    fontSize: wp('6%'),
    color: myTheme.TEXT_COLOR2,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
});

export default GuidelineScreen;
