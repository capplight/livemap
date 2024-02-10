import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect, FC, useRef} from 'react';
import ReelsComponent from '../Components/ReelsComponents/ReelsComponent';

interface Reels {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Reels: FC<Reels> = ({navigation}: Reels) => {
  return (
    <SafeAreaView style={styles.container}>
      <ReelsComponent />
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
