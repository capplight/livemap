import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/routers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '@themes/Colors';

export function homeNavigation({navigation}: any) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'tabs'}],
    }),
  );
}

export const VerticalLine = (height?: number, extraStyles?: any) => {
  return (
    <View
      style={[
        extraStyles,
        {
          width: hp(0.1),
          height: height === undefined || null ? wp(46) : height,
          marginRight: wp(4),
          backgroundColor: Colors.primaryColor,
        },
      ]}
    />
  );
};

export const horizontalLine = (width?: number) => {
  return (
    <View
      style={{
        width: width === undefined || null ? wp(47) : width,
        height: hp(0.1),
        backgroundColor: Colors.primaryColor,
      }}
    />
  );
};

export const OrHorizontalLine = () => {
  return (
    <View
      style={{
        marginVertical: hp(2),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {horizontalLine()}
      <Text
        style={{
          marginHorizontal: wp(1),
          color: Colors.lightWhite,
          opacity: 0.5,
        }}>
        OR
      </Text>
      {horizontalLine()}
    </View>
  );
};

export const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

// export const mapStyle = [
//   {
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#242f3e',
//       },
//     ],
//   },
//   {
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         saturation: -5,
//       },
//       {
//         lightness: -5,
//       },
//     ],
//   },
//   {
//     elementType: 'labels.icon',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#242f3e',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.country',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#746855',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.land_parcel',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.locality',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#d59563',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#d59563',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.business',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#263c3f',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#6b9a76',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#1B1B1B',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     stylers: [
//       {
//         visibility: 'on',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#2C2C2C',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#8A8A8A',
//       },
//     ],
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#373737',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#3C3C3C',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway.controlled_access',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#4E4E4E',
//       },
//     ],
//   },
//   {
//     featureType: 'road.local',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#616161',
//       },
//     ],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#757575',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#17263c',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#3D3D3D',
//       },
//     ],
//   },
// ];
