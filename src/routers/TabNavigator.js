import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from 'src/styles/index';
import HomeStack from './HomeStack';
import SettingStack from './SettingStack';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
        activeTintColor: colors.black,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={30}
              style={{ color: focused ? colors.black : colors.greyLight }}
            />
          ),
          unmountOnBlur: false,
        })}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={({ route }) => ({
          title: "Setting",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="settings"
              size={30}
              style={{ color: focused ? colors.black : colors.greyLight }}
            />
          ),
          unmountOnBlur: false,
        })}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
