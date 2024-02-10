import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, FC} from 'react';
import {Text, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/routers';
import {SafeAreaView} from 'react-native-safe-area-context';

interface SplashScreen {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const SplashScreen: FC<SplashScreen> = ({navigation}: SplashScreen) => {
  useEffect(() => {
    splashNavigation();
  });

  function splashNavigation() {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'tabs'}],
        }),
      );
    }, 800);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{alignSelf: 'center', color: 'black'}}>
        Welcome to Our App
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
