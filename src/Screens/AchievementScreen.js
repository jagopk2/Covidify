import {
  AppRegistry,
  FlatList,
  Image,
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
  get_achievementPoints,
  get_goal,
  logo_helper,
} from '../helpers/achievementHelper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {setActivity, setHandWashPoints, setMaskPoints} from '../actions';

import AchievementLineCard from '../components/AchievementLineCard';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import LineCard from '../components/LineCard';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import ToggleBox from 'react-native-show-hide-toggle-box';
import myTheme from '../../styles/theme.style';
import store from '../store';

const logoImages = [
  require(`../../assets/awards/0.png`),
  require(`../../assets/awards/1.png`),
  require(`../../assets/awards/2.png`),
  require(`../../assets/awards/3.png`),
  require(`../../assets/awards/4.png`),
  require(`../../assets/awards/5.png`),
  require(`../../assets/awards/6.png`),
  require(`../../assets/awards/6.png`),
];
const logoTitles = [
  'Head Start',
  'First Achievement',
  'Slow and Steady',
  'Getting Safer',
  'Climbing Success',
  'Expert',
  'Corona Killer',
  'Corona Killer',
];

const AchievementScreen = ({navigation}) => {
  const maskPoints = useSelector((state) => state.maskPoints);
  const handWashPoints = useSelector((state) => state.handWashPoints);
  const [achievementArray, setAchievementArray] = useState([]);
  const dispatch = useDispatch();

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
    setAchievementArray(logo_helper(maskPoints, handWashPoints));
    console.log(achievementArray);
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
  return (
    <ScrollView style={styles.container}>
      {/* <NavigationEvents
        onDidBlur={(payload) => console.log('did blur', payload)}
      /> */}
      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>Achievements</Text>
        <SimpleLineIcons
          ImageComponent={FastImage}
          name={'badge'}
          size={30}
          color={'white'}
          style={styles.mainHeadingIcon}
        />
      </View>
      <Text style={styles.g1MainHeading}>Earned Badges</Text>
      <View style={styles.g1container}>
        {achievementArray.length ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={achievementArray}
            renderItem={({item}) => {
              return (
                <View style={styles.logoCard}>
                  <Image
                    style={styles.logoCardImage}
                    source={logoImages[item]}
                    resizeMode={'center'}
                  />
                  <Text style={styles.logoCardText}>{logoTitles[item]}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.toString()}
            horizontal={true}
          />
        ) : (
          <Text>No logos</Text>
        )}
      </View>
      <Text style={styles.g1MainHeading}>Current Progress</Text>

      <View style={styles.g2container}>
        {achievementArray.length ? (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.logoCardImage}
                source={logoImages[achievementArray.length]}
                resizeMode={'center'}
              />
              <Text style={styles.logoCardText2}>
                {' '}
                {logoTitles[achievementArray.length]}
              </Text>
            </View>
            <AchievementLineCard
              points={maskPoints}
              total={get_achievementPoints(achievementArray.length)}
              achievementNo={achievementArray.length}
              color1={myTheme.PRIMARY_COLOR1}
              color2={myTheme.PRIMARY_COLOR3}
              title={'Mask Weared'}
            />
            <AchievementLineCard
              points={handWashPoints}
              total={get_achievementPoints(achievementArray.length)}
              achievementNo={achievementArray.length}
              color1={myTheme.SECONDARY_COLOR1}
              color2={myTheme.SECONDARY_COLOR2}
              title={'Hand Washed'}
            />
          </>
        ) : (
          <Text>No info Available</Text>
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
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  mainHeading: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    marginLeft: wp('7%'),
    marginRight: wp('5%'),

    // textAlign: 'center',
    fontSize: wp('7%'),
    color: 'white',
  },
  g2container: {
    // height: hp('30%'),
    // width: wp('90%'),
    marginHorizontal: wp('5%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
    backgroundColor: myTheme.WHITE_SHADE1,
  },
  g2MainHeading: {
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
    fontWeight: 'bold',
    fontSize: wp('6%'),
  },
  g1MainHeading: {
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    fontSize: wp('6%'),
  },
  g1container: {
    // height: hp('30%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
    // flexDirection: 'row',
  },

  logoCard: {
    marginHorizontal: wp('2%'),
    backgroundColor: myTheme.WHITE_SHADE1,
    alignItems: 'center',
    height: 'auto',
    width: wp('25%'),
    borderRadius: wp('5%'),
  },
  logoCardImage: {
    marginVertical: hp('1%'),
    height: hp('10%'),
    width: wp('21%'),
  },
  logoCardText: {
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  logoCardText2: {
    textAlign: 'center',
    // marginBottom: hp('1%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
});

export default AchievementScreen;
