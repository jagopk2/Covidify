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
import {Button, Text} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Bar} from 'react-native-progress';

const AchievementLineCard = ({
  points,
  total,
  color1,
  color2,
  title,
  achievementNo,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{title}</Text>
      <Bar
        progress={total == 0 ? 0 : points / total}
        width={100}
        color={color1}
        unfilledColor={'white'}
        borderColor={color1}
        style={styles.barStyle}
      />
      <Text style={styles.rightText}>
        {points}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  leftText: {
    marginLeft: wp('5%'),
  },
  rightText: {
    marginLeft: wp('5%'),
    // marginRight: wp('2%'),
  },
  rightText2: {
    marginLeft: wp('3%'),
    color: 'grey',
  },
  barStyle: {
    marginLeft: wp('5%'),
  },
});

export default AchievementLineCard;
