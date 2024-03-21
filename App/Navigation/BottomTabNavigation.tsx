import * as React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesignIcon, EvilIcons, isIOS} from '../Themes/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../Themes/Colors';
import {Home} from '../Screen/Home';
import {Reels} from '../Screen/Reels';
import {Feed} from '../Screen/Feed';
import {Profile} from '../Screen/Profile';
import {AddPost} from '../Screen/AddPost';
import Svg, {G, Path} from 'react-native-svg';

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
          fontSize: hp(1.4),
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
            <Svg
              width={size}
              height={size}
              viewBox="0 0 26 26"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit={2}>
              <G transform="matrix(1,0,0,1,-2.99997,-1.5)">
                <Path
                  d="M27.3503 12.9991L17.3503 3.91157C16.9816 3.57427 16.5 3.38721 16.0003 3.38721C15.5006 3.38721 15.019 3.57427 14.6503 3.91157L4.65027 12.9991C4.44552 13.1864 4.282 13.4143 4.17009 13.6682C4.05819 13.9221 4.00035 14.1966 4.00027 14.4741V25.9866C3.99214 26.4908 4.17015 26.9803 4.50027 27.3616C4.68763 27.5746 4.91843 27.7451 5.17716 27.8615C5.43589 27.978 5.71655 28.0376 6.00027 28.0366H12.0003C12.2655 28.0366 12.5198 27.9312 12.7074 27.7437C12.8949 27.5561 13.0003 27.3018 13.0003 27.0366V21.0366C13.0003 20.7714 13.1056 20.517 13.2932 20.3295C13.4807 20.1419 13.7351 20.0366 14.0003 20.0366H18.0003C18.2655 20.0366 18.5198 20.1419 18.7074 20.3295C18.8949 20.517 19.0003 20.7714 19.0003 21.0366V27.0366C19.0003 27.3018 19.1056 27.5561 19.2932 27.7437C19.4807 27.9312 19.7351 28.0366 20.0003 28.0366H26.0003C26.332 28.0395 26.659 27.9578 26.9503 27.7991C27.2673 27.6264 27.532 27.3717 27.7167 27.0617C27.9014 26.7516 27.9994 26.3975 28.0003 26.0366V14.4741C28.0002 14.1966 27.9423 13.9221 27.8304 13.6682C27.7185 13.4143 27.555 13.1864 27.3503 12.9991Z"
                  fill={color}
                />
              </G>
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarLabel: 'Reels',
          tabBarIcon: ({color, size, focused}) => (
            <Svg width={28} height={28} viewBox="0 0 22 26">
              <G transform="matrix(1,0,0,1,-3,-1)">
                <Path
                  d="M11.875 11.2067C11.875 10.6101 11.875 10.3118 11.9997 10.1452C12.1083 10.0001 12.2746 9.90929 12.4555 9.89638C12.663 9.88156 12.9139 10.0429 13.4158 10.3655L19.3165 14.1588C19.752 14.4388 19.9697 14.5788 20.0449 14.7567C20.1106 14.9123 20.1106 15.0877 20.0449 15.2433C19.9697 15.4212 19.752 15.5612 19.3165 15.8412L13.4158 19.6345C12.9139 19.9571 12.663 20.1184 12.4555 20.1036C12.2746 20.0907 12.1083 19.9999 11.9997 19.8548C11.875 19.6882 11.875 19.3899 11.875 18.7933V11.2067Z"
                  stroke={color}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill={'transparent'}
                />
                <Path
                  d="M3.75 9.75C3.75 7.6498 3.75 6.5997 4.15873 5.79754C4.51825 5.09193 5.09193 4.51825 5.79754 4.15873C6.5997 3.75 7.6498 3.75 9.75 3.75H20.25C22.3502 3.75 23.4003 3.75 24.2025 4.15873C24.9081 4.51825 25.4817 5.09193 25.8413 5.79754C26.25 6.5997 26.25 7.6498 26.25 9.75V20.25C26.25 22.3502 26.25 23.4003 25.8413 24.2025C25.4817 24.9081 24.9081 25.4817 24.2025 25.8413C23.4003 26.25 22.3502 26.25 20.25 26.25H9.75C7.6498 26.25 6.5997 26.25 5.79754 25.8413C5.09193 25.4817 4.51825 24.9081 4.15873 24.2025C3.75 23.4003 3.75 22.3502 3.75 20.25V9.75Z"
                  stroke={color}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill={'transparent'}
                />
              </G>
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size, focused}) => (
            <View style={{top: hp(1), position: 'absolute'}}>
              <AntDesignIcon name="pluscircleo" color={color} size={wp(10)} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size, focused}) => (
            <Svg width={28} height={28} viewBox="0 0 22 26">
              <G transform="matrix(1,0,0,1,-3,-1)">
                <Path
                  d="M10.4997 3.5L9.33301 9.33333M18.6663 3.5L17.4997 9.33333M25.6663 9.33333H2.33301M7.93301 24.5H20.0663C22.0265 24.5 23.0066 24.5 23.7553 24.1185C24.4139 23.783 24.9493 23.2475 25.2849 22.589C25.6663 21.8403 25.6663 20.8602 25.6663 18.9V9.1C25.6663 7.13982 25.6663 6.15972 25.2849 5.41103C24.9493 4.75247 24.4139 4.21703 23.7553 3.88148C23.0066 3.5 22.0265 3.5 20.0663 3.5H7.93301C5.97282 3.5 4.99273 3.5 4.24404 3.88148C3.58547 4.21703 3.05004 4.75247 2.71448 5.41103C2.33301 6.15972 2.33301 7.13982 2.33301 9.1V18.9C2.33301 20.8602 2.33301 21.8403 2.71448 22.589C3.05004 23.2475 3.58547 23.783 4.24404 24.1185C4.99273 24.5 5.97282 24.5 7.93301 24.5Z"
                  stroke={color}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill={'transparent'}
                />
              </G>
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <EvilIcons name="user" color={color} size={wp(10)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
