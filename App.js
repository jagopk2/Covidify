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

import ActivityScreen from './src/Screens/ActivityScreen';
import FlashMessage from 'react-native-flash-message';
import GuidelineScreen from './src/Screens/GuideLineScreen';
import HomePageScreen from './src/Screens/HomePageScreen';
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
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePageScreen} />
            <Tab.Screen name="Location" component={LocationScreen} />
            <Tab.Screen name="Guidelines" component={GuidelineScreen} />
            <Tab.Screen name="Activity" component={ActivityScreen} />
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
