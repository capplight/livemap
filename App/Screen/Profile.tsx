import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect, FC, useRef} from 'react';

interface Profile {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Profile: FC<Profile> = ({navigation}: Profile) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'black'}}>Profile Screen!</Text>
      </View>
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
