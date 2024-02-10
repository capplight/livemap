import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FeatherIcon, isIOS} from '../Themes/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../Themes/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../Themes/Fonts';
import {Home} from '../Screen/Home';
import {Reels} from '../Screen/Reels';
import {Feed} from '../Screen/Feed';
import {Profile} from '../Screen/Profile';
import {AddPost} from '../Screen/AddPost';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: {
          height: hp(8),
        },
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: Colors.activeColor,
        tabBarLabelStyle: {
          fontFamily: Fonts.robotoMedium,
          fontSize: hp(1.3),
          // fontWeight: 'bold',
          marginTop: isIOS ? hp(-0.2) : hp(-0.7),
          marginBottom: hp(isIOS ? 0.1 : 0.2),
        },
        tabBarStyle: {height: hp(7), backgroundColor: '#17041E'},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../Assets/icons/home.png')}
              style={
                focused ? {tintColor: Colors.activeColor} : {tintColor: 'white'}
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarLabel: 'Reels',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../Assets/icons/reels.png')}
              style={
                focused ? {tintColor: Colors.activeColor} : {tintColor: 'white'}
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../Assets/icons/PlusCircle.png')}
              style={
                focused
                  ? {tintColor: Colors.activeColor, marginTop: hp(1)}
                  : {tintColor: 'white', marginTop: hp(1)}
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={require('../Assets/icons/feed.png')}
              style={
                focused ? {tintColor: Colors.activeColor} : {tintColor: 'white'}
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
