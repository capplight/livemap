import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect, FC, useRef} from 'react';

interface AddPost {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const AddPost: FC<AddPost> = ({navigation}: AddPost) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'black'}}>Post Your Stuffs Here...!!</Text>
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
