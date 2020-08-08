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

import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import activitySchema from '../schema/activitySchema';
// import ToggleBox from 'react-native-show-hide-toggle-box';
import myTheme from '../../styles/theme.style';
import {setActivity} from '../actions';
import store from '../store';

const ActivityScreen = ({navigation}) => {
  const activityData = useSelector((state) => state.activityData);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    Realm.open({schema: [activitySchema]})
      .then((realm) => {
        // Create Realm objects and write to local storage
        setIsFetching(true);
        // Query Realm for all cars with a high mileage
        const activities = realm
          .objects('Activity')
          .sorted('date', true)
          .slice(0, 10);
        // console.log(activities, activities.length); // => 1
        // store.dispatch(setActivity(activities));
        let newActivities = JSON.parse(JSON.stringify(activities));

        // plainResults = JSON.parse(JSON.stringfy(results))
        console.log(newActivities);
        store.dispatch(setActivity(newActivities));
        setIsFetching(false);
        realm.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isFetching) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* <NavigationEvents
        onDidBlur={(payload) => console.log('did blur', payload)}
      /> */}
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>My Activity</Text>
        <Feather
          ImageComponent={FastImage}
          name={'book'}
          size={30}
          color={'white'}
          style={styles.mainHeadingIcon}
        />
      </View>
      <View>
        {activityData.length ? (
          <View
            // key={i}
            style={{
              ...styles.activityRowContainer,
              backgroundColor: myTheme.PRIMARY_COLOR3,
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
                    data.type == 'Mask'
                      ? myTheme.PRIMARY_COLOR3
                      : myTheme.SECONDARY_COLOR2,
                }}>
                <FontAwesome5
                  name={data.type == 'Mask' ? 'head-side-mask' : 'hands-wash'}
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
          <Text>No Activity </Text>
        )}
      </View>
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
