import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect, FC, useRef} from 'react';
import InstaStory from 'react-native-insta-story';
import {storyData} from '../Constants/storyData';

interface Feed {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Feed: FC<Feed> = ({navigation}: Feed) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <InstaStory data={storyData} duration={5} />
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
