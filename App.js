/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AchievementScreen from './src/Screens/AchievementScreen';
import ActivityScreen from './src/Screens/ActivityScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlashMessage from 'react-native-flash-message';
import Foundation from 'react-native-vector-icons/Foundation';
import GuidelineScreen from './src/Screens/GuideLineScreen';
import HomePageScreen from './src/Screens/HomePageScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationScreen from './src/Screens/LocationScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import myTheme from './styles/theme.style';
import store from './src/store';

const Tab = createBottomTabNavigator();
const theme = {
  Button: {
    raised: true,
    titleStyle: {
      color: myTheme.TEXT_COLOR1,
    },
    buttonStyle: {
      backgroundColor: myTheme.PRIMARY_COLOR2,
    },
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: myTheme.PRIMARY_COLOR3,
              inactiveTintColor: 'grey',
            }}>
            <Tab.Screen
              name="Home"
              component={HomePageScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Location"
              component={LocationScreen}
              options={{
                tabBarLabel: 'Location',
                tabBarIcon: ({color, size}) => (
                  <Foundation name="map" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Guidelines"
              component={GuidelineScreen}
              options={{
                tabBarLabel: 'Guidelines',
                tabBarIcon: ({color, size}) => (
                  <AntDesign name="book" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Achievements"
              component={AchievementScreen}
              options={{
                tabBarLabel: 'Achievement',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="medal-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Activity"
              component={ActivityScreen}
              options={{
                tabBarLabel: 'Activity',
                tabBarIcon: ({color, size}) => (
                  <Foundation
                    name="clipboard-notes"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
          <FlashMessage position="top" animated={true} />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
