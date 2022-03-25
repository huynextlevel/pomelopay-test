import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'src/screens/Home/HomeScreen';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={navigation => ({
          headerLeft: false,
          headerShown: true,
          gestureEnabled: true,
          headerTitle: 'Binance Coin List',
        })}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});
