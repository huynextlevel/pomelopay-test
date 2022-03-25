import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import * as appActions from '../store/action/app';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => navigation.addListener('focus', () => {
    dispatch(appActions.getCoinList(navigation));
  }), [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Pomelo Pay</Text>
      <ActivityIndicator color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
