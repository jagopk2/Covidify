import {
  AppRegistry,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BarChart,
  ContributionGraph,
  ProgressChart,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Button, ListItem, Text} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  setActivity,
  setHandWashPoints,
  setHomeLocation,
  setMaskPoints,
  setTotalInsidePoints,
  setTotalOutsidePoints,
} from '../actions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-job';
import {Bar} from 'react-native-progress';
import CardCircle from '../components/CardCirle';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LineCard from '../components/LineCard';
import Pie from 'react-native-pie';
// import ProgressCircle from 'react-native-progress-circle';
import {ProgressCircle} from 'react-native-svg-charts';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {getDistance} from 'geolib';
import {get_goal} from '../helpers/achievementHelper';
import myTheme from '../../styles/theme.style';
import {showMessage} from 'react-native-flash-message';
import store from '../store';

const regularJobKey = 'regularJobKey';
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: async (notification) => {
    console.log('NOTIFICATION:', notification);
    if (notification.tag == '2') {
      await AsyncStorage.setItem('isOutside', 'false');
    } else if (notification.tag == '3') {
      await AsyncStorage.setItem('isOutside', 'true');
    }
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: async (notification) => {
    console.log('ACTION:', notification.action);
    const action = notification.action;
    const tag = notification.tag;
    console.log(action, tag);
    if (tag == '2') {
      const maskPoints = await AsyncStorage.getItem('maskPoints');
      const totalOutsidePoints = await AsyncStorage.getItem(
        'totalOutsidePoints',
      );
      // const maskNotificationStatus = await AsyncStorage.getItem(
      //   'maskNotificationStatus',
      // );
      if (maskPoints && totalOutsidePoints) {
        var tmp = parseInt(maskPoints) + 10;
        var tmp2 = parseInt(totalOutsidePoints) + 10;
        if (action === 'Yes') {
          await AsyncStorage.setItem('maskPoints', tmp.toString());
          store.dispatch(setMaskPoints(tmp));
          let activities = await AsyncStorage.getItem('activityData');
          if (activities) {
            activities = JSON.parse(activities);
            let temp = [
              ...activities,
              {type: 'mask', points: '10', date: Date.now()},
            ];
            await AsyncStorage.setItem('activityData', JSON.stringify(temp));
            store.dispatch(setActivity(temp));
          } else {
            let temp = [{type: 'mask', points: '10', date: Date.now()}];
            await AsyncStorage.setItem('activityData', JSON.stringify(temp));
            store.dispatch(setActivity(temp));
          }
        } else {
          callNotification4();
        }
        await AsyncStorage.setItem('totalOutsidePoints', tmp2.toString());
        // await AsyncStorage.setItem('maskNotificationStatus', 'true');
        // await AsyncStorage.setItem('handWashNotificationStatus', 'false');

        store.dispatch(setTotalOutsidePoints(tmp2));
      }
    } else if (tag == '3') {
      const handWashPoints = await AsyncStorage.getItem('handWashPoints');
      const totalInsidePoints = await AsyncStorage.getItem('totalInsidePoints');

      // const handWashNotificationStatus = await AsyncStorage.getItem(
      //   'handWashNotificationStatus',
      // );
      if (handWashPoints && totalInsidePoints) {
        var tmp = parseInt(handWashPoints) + 10;
        var tmp2 = parseInt(totalInsidePoints) + 10;
        if (action === 'Yes') {
          await AsyncStorage.setItem('handWashPoints', tmp.toString());
          store.dispatch(setHandWashPoints(tmp));
          let activities = await AsyncStorage.getItem('activityData');
          if (activities) {
            activities = JSON.parse(activities);
            let temp = [
              ...activities,
              {type: 'handWash', points: '10', date: Date.now()},
            ];
            await AsyncStorage.setItem('activityData', JSON.stringify(temp));
            store.dispatch(setActivity(temp));
          } else {
            let temp = [{type: 'handWash', points: '10', date: Date.now()}];
            await AsyncStorage.setItem('activityData', JSON.stringify(temp));
            store.dispatch(setActivity(temp));
          }
        } else {
          callNotification5();
        }
        await AsyncStorage.setItem('totalInsidePoints', tmp2.toString());

        // await AsyncStorage.setItem('handWashNotificationStatus', 'true');
        // await AsyncStorage.setItem('maskNotificationStatus', 'false');

        store.dispatch(setTotalInsidePoints(tmp2));
      }
    }

    // const tag = notification.tag;
    // console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});
BackgroundJob.register({
  jobKey: regularJobKey,
  job: async () => {
    console.log(`Background Job fired!. Key = ${regularJobKey}`);
    PushNotification.getDeliveredNotifications((value) => {
      var bool = true;
      if (value.length > 0) {
        for (const val of value) {
          // console.log(val);
          console.log(val.tag);
          if (val.tag === '1') {
            bool = false;
            break;
          }
        }
      } else {
        bool = false;
      }
      if (bool) {
        callNotification();
      } else console.log('Notification is already there');
    });

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).catch((err) => console.log(err));
    if (granted == 'granted') {
      Geolocation.getCurrentPosition(
        async (newLoc) => {
          const location = await AsyncStorage.getItem('homeLocation');
          // console.log(newLoc);
          if (newLoc && location) {
            console.log('Real Location', location);
            console.log('dynamic newLoc', newLoc);
            var distance = getDistance(
              JSON.parse(location).coords,
              newLoc.coords,
            );
            console.log('Location Distance', distance);
            const isOutside = await AsyncStorage.getItem('isOutside');

            if (parseInt(distance) > 50 && isOutside == 'false') {
              callNotification2();
              await AsyncStorage.setItem('isOutside', 'true');
            } else if (parseInt(distance) <= 50 && isOutside == 'true') {
              callNotification3();
              await AsyncStorage.setItem('isOutside', 'false');
            }
          }
        },
        (err) => console.log(err),
        {enableHighAccuracy: true},
      );
    } else {
      console.log('Please give permission');
    }
  },
});

const HomePageScreen = () => {
  const location = useSelector((state) => state.location);
  const maskPoints = useSelector((state) => state.maskPoints);
  const handWashPoints = useSelector((state) => state.handWashPoints);
  const totalInsidePoints = useSelector((state) => state.totalInsidePoints);
  const totalOutsidePoints = useSelector((state) => state.totalOutsidePoints);
  const activityData = useSelector((state) => state.activityData);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLoc = async () => {
      var loc = await AsyncStorage.getItem('homeLocation');
      if (loc) {
        // console.log('///', loc);
        dispatch(setHomeLocation(JSON.parse(loc)));
      }
    };
    getLoc();
  }, []);
  useEffect(() => {
    const getMaskPoints = async () => {
      var points = await AsyncStorage.getItem('maskPoints');
      if (points) {
        // console.log('///', loc);
        dispatch(setMaskPoints(parseInt(points)));
      } else {
        await AsyncStorage.setItem('maskPoints', '0');
      }
    };
    getMaskPoints();
  }, []);
  useEffect(() => {
    const getHandWashPoints = async () => {
      var points = await AsyncStorage.getItem('handWashPoints');
      if (points) {
        // console.log('///', loc);
        dispatch(setHandWashPoints(parseInt(points)));
      } else {
        await AsyncStorage.setItem('handWashPoints', '0');
      }
    };
    getHandWashPoints();
  }, []);
  useEffect(() => {
    const getIsOutside = async () => {
      var isOutside = await AsyncStorage.getItem('isOutside');
      if (!isOutside) {
        await AsyncStorage.setItem('isOutside', 'false');
      }
    };
    getIsOutside();
  }, []);
  useEffect(() => {
    const getTotalOutside = async () => {
      var totalOutsidePoints = await AsyncStorage.getItem('totalOutsidePoints');
      if (totalOutsidePoints) {
        dispatch(setTotalOutsidePoints(parseInt(totalOutsidePoints)));
      } else {
        await AsyncStorage.setItem('totalOutsidePoints', '0');
      }
    };
    getTotalOutside();
  }, []);
  useEffect(() => {
    const getTotalInside = async () => {
      var totalInsidePoints = await AsyncStorage.getItem('totalInsidePoints');
      if (totalInsidePoints) {
        dispatch(setTotalInsidePoints(parseInt(totalInsidePoints)));
      } else {
        await AsyncStorage.setItem('totalInsidePoints', '0');
      }
    };
    getTotalInside();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Text>This is the HomePageScreen</Text>
      <Text>Mask Points {maskPoints}</Text>
      <Text>Hand Wash Points {handWashPoints}</Text>
      <Text>Total Outside Points {totalOutsidePoints}</Text>
      <Text>Hand Wash Points {totalInsidePoints}</Text> */}

      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>{greetingText()}</Text>
        {greetingIcon()}
      </View>
      <View style={styles.gridContainer}>
        <Grid>
          <Row style={styles.gridRow}>
            <Col style={styles.gridCol}>
              <CardCircle
                obtained={maskPoints}
                total={totalOutsidePoints}
                color1={myTheme.PRIMARY_COLOR1}
                color2={myTheme.PRIMARY_COLOR3}
                heading={'Mask Points'}
                goal={get_goal(maskPoints)}
                fill={(maskPoints / get_goal(maskPoints)) * 100}
              />
            </Col>
            <Col>
              <CardCircle
                obtained={handWashPoints}
                total={totalInsidePoints}
                color1={myTheme.SECONDARY_COLOR1}
                color2={myTheme.SECONDARY_COLOR2}
                heading={'Hand Wash Points'}
                goal={get_goal(handWashPoints)}
                fill={(handWashPoints / get_goal(handWashPoints)) * 100}
              />
            </Col>
          </Row>
        </Grid>
      </View>
      {/* <Text>{Math.ceil((maskPoints / totalOutsidePoints) * 100)}</Text>
        <Text>{Math.floor((1 - maskPoints / totalOutsidePoints) * 100)}</Text> */}
      <View style={styles.g2container}>
        <Text style={styles.g2MainHeading}>Overall Info</Text>
        <LineCard
          points={maskPoints}
          total={totalOutsidePoints}
          color1={myTheme.PRIMARY_COLOR1}
          color2={myTheme.PRIMARY_COLOR3}
          title={'Worn Mask'}
        />
        <LineCard
          points={handWashPoints}
          total={totalInsidePoints}
          color1={myTheme.SECONDARY_COLOR1}
          color2={myTheme.SECONDARY_COLOR2}
          title={'Washed Hands'}
        />
      </View>

      {/* <Button
        title={'Schedule Job'}
        onPress={() => {
          BackgroundJob.schedule({
            jobKey: regularJobKey,
            period: 1000,
          });
        }}
      />

      <Button
        title={'Stop'}
        onPress={() => {
          BackgroundJob.cancelAll();
        }}
      />
      <Button
        title={'notification 2'}
        onPress={() => {
          callNotification2();
        }}
        // buttonStyle={{backgroundColor: '#ec3c4b'}}
      />
      <Button
        title={'dynamic'}
        onPress={async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted == 'granted') {
            Geolocation.getCurrentPosition(async (newLoc) => {
              console.log(newLoc);
              if (newLoc) {
                console.log('dynamic newLoc', JSON.stringify(newLoc));
                console.log(
                  'Location Distance',
                  getDistance(location.coords, newLoc.coords),
                );
              }
            });
          } else {
            console.log('Please give permission');
          }
        }}
      /> */}
    </ScrollView>
  );
};

const greetingText = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return 'Good Morning';
  } else if (curHr < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
const greetingIcon = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return (
      <Feather
        name={'sun'}
        size={30}
        color={myTheme.ICON_COLOR1}
        style={styles.mainHeadingIcon}
      />
    );
  } else if (curHr < 18) {
    return (
      <Ionicons
        name={'partly-sunny-outline'}
        size={30}
        color={myTheme.ICON_COLOR1}
        style={styles.mainHeadingIcon}
      />
    );
  } else {
    return (
      <Feather
        name={'moon'}
        size={30}
        color={myTheme.ICON_COLOR1}
        style={styles.mainHeadingIcon}
      />
    );
  }
};

const callNotification = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Maskify', // (optional)
    message: 'Maskify service is running', // (required)
    // actions: '["Yes", "No"]',
    invokeApp: false,
    ongoing: true,
    autoCancel: false,
    onlyAlertOnce: true,
    tag: '1',
    smallIcon: 'ic_notification',
  });
};
const callNotification2 = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Maskify', // (optional)
    message: 'Did You wear your mask?', // (required)
    actions: '["Yes", "No"]',
    invokeApp: false,
    ongoing: true,
    // autoCancel: true,
    smallIcon: 'ic_notification',

    // onlyAlertOnce: true,
    tag: '2',
  });
};
const callNotification3 = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Maskify', // (optional)
    message: 'Did You Washed Your Hands?', // (required)
    actions: '["Yes", "No"]',
    invokeApp: false,
    smallIcon: 'ic_notification',
    ongoing: true,
    // autoCancel: true,
    // onlyAlertOnce: true,
    tag: '3',
  });
};
const callNotification4 = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Maskify', // (optional)
    message: 'Kindly wear mask next time', // (required)
    // actions: '["Yes", "No"]',
    invokeApp: false,
    smallIcon: 'ic_notification',
    // ongoing: true,
    autoCancel: true,
    onlyAlertOnce: true,
    tag: '3',
  });
};
const callNotification5 = () => {
  PushNotification.localNotification({
    /* iOS and Android properties */
    title: 'Maskify', // (optional)
    message: 'Kindly wash hands now', // (required)
    // actions: '["Yes", "No"]',
    invokeApp: false,
    smallIcon: 'ic_notification',
    // ongoing: true,
    autoCancel: true,
    onlyAlertOnce: true,
    tag: '3',
  });
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: myTheme.BACKGROUND_COLOR,
  },
  gridContainer: {
    height: hp('40%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  gridRow: {
    alignItems: 'center',
  },
  gridCol: {
    marginRight: wp('5%'),
  },
  g2container: {
    height: hp('20%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
  },
  g2MainHeading: {
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
    fontWeight: 'bold',
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
  mainHeadingContainer: {
    backgroundColor: myTheme.PRIMARY_COLOR2,
    borderBottomLeftRadius: wp('10%'),
    flexDirection: 'row',
  },
  mainHeadingIcon: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  g3container: {
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
const chartConfig = {
  backgroundGradientFrom: 'white',
  // backgroundColor: '#e26a00',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => myTheme.PRIMARY_COLOR1,
};

export default HomePageScreen;
