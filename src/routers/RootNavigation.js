import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from 'src/screens/SplashScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function NavigatorView() {
  return (
    <Stack.Navigator initialrouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
