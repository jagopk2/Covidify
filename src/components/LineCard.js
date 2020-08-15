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
import myTheme from '../../styles/theme.style';

const LineCard = ({points, total, color1, color2, title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{title}</Text>
      <Bar
        progress={total == 0 ? 0 : points / total}
        width={100}
        color={color1}
        unfilledColor={'white'}
        borderColor={color1}
        style={
          title == 'Worn Mask'
            ? {marginLeft: wp('17%')}
            : {marginLeft: wp('11%')}
        }
      />
      <Text style={styles.rightText}>
        {points / 10}/{total / 10}
      </Text>
      {/* <Text style={styles.rightText2}>{'>'}</Text> */}
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
    marginLeft: wp('11%'),
  },
});

export default LineCard;
