import {
  AppRegistry,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text} from 'react-native-elements';

const CardCircle = ({obtained, total, color1, color2, heading, goal, fill}) => {
  return (
    <View style={{...styles.mainContainer, backgroundColor: color1}}>
      <Text style={styles.mainHeading}>{heading}</Text>
      <AnimatedCircularProgress
        size={125}
        width={9}
        // backgroundWidth={5}
        lineCap={'round'}
        fill={fill}
        // fill={}
        tintColor="white"
        padding={10}
        backgroundColor={color2}>
        {(fill) => <Text style={{color: 'white'}}>{Math.floor(fill)}%</Text>}
      </AnimatedCircularProgress>
      <View style={styles.pointsTextContainer}>
        <Text style={styles.pointsText}> Goal</Text>
        <Text style={styles.pointsText}>
          {obtained} / {goal}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  pointsText: {
    color: 'white',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  pointsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: {
    color: 'white',
    margin: 10,
    textAlign: 'center',
  },
  mainContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CardCircle;
