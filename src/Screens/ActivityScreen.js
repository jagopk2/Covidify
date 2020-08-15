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
import React, {useEffect, useFocusEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
// import ToggleBox from 'react-native-show-hide-toggle-box';
import myTheme from '../../styles/theme.style';
import {setActivity} from '../actions';
import store from '../store';

const ActivityScreen = ({navigation}) => {
  const activityData = useSelector((state) => state.activityData);
  const [animationState, setAnimationState] = useState('reward');
  const dispatch = useDispatch();
  useEffect(() => {
    const getActivityData = async () => {
      var activity = await AsyncStorage.getItem('activityData');
      if (activity) {
        // console.log('///', loc);
        dispatch(setActivity(JSON.parse(activity)));
      }
    };
    getActivityData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <NavigationEvents
        onDidBlur={(payload) => console.log('did blur', payload)}
      /> */}
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>My Activity</Text>
        <Foundation
          ImageComponent={FastImage}
          name={'clipboard-notes'}
          size={30}
          color={myTheme.ICON_COLOR1}
          style={styles.mainHeadingIcon}
        />
      </View>
      <View>
        {activityData.length ? (
          <View
            // key={i}
            style={{
              ...styles.activityRowContainer,
              backgroundColor: myTheme.PRIMARY_COLOR1,
            }}>
            <Text style={styles.activityRowText}>Type</Text>
            <Text style={styles.activityRowText}>Points</Text>

            <Text style={styles.activityRowText}>Date</Text>
          </View>
        ) : null}
        {activityData.length ? (
          activityData.map((data, i) => {
            return (
              <View
                key={i}
                style={{
                  ...styles.activityRowContainer,
                  backgroundColor:
                    data.type == 'mask'
                      ? myTheme.PRIMARY_COLOR1
                      : myTheme.SECONDARY_COLOR1,
                }}>
                <FontAwesome5
                  name={data.type == 'mask' ? 'head-side-mask' : 'hands-wash'}
                  size={25}
                  color={myTheme.TEXT_COLOR1}
                />
                <Text style={styles.activityRowText}>{data.points}</Text>

                <Text style={styles.activityRowText}>
                  {` ${new Date(data.date).toLocaleDateString()}`}
                </Text>
              </View>
            );
          })
        ) : (
          <Text
            style={{
              textAlign: 'center',
              marginTop: hp('30%'),
              fontSize: wp('7%'),
            }}>
            No Activity For Now{' '}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
    marginLeft: wp('7%'),
    marginRight: wp('5%'),

    // textAlign: 'center',
    fontSize: wp('7%'),
    color: myTheme.TEXT_COLOR1,
  },
  activityRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
    // backgroundColor: myTheme.PRIMARY_COLOR3,
    height: hp('7%'),
    alignItems: 'center',
    padding: wp('5%'),
    borderRadius: wp('5%'),
  },
  activityRowText: {
    color: myTheme.TEXT_COLOR1,
  },
});

export default ActivityScreen;
