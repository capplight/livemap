import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/routers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '@themes/Colors';
import Toast, {ToastType} from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseUrl =
  'https://kg4yg99jv0.execute-api.ap-south-1.amazonaws.com';
export const coverImageLink =
  'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2NjcxMC1pbWFnZS1rd3Z4eGVxcC5qcGc.jpg';

export const profileImageLink =
  'https://image.shutterstock.com/image-photo/young-brazilian-man-isolated-on-260nw-2242569333.jpg';

export const TOKEN_KEY = 'token';
export const FCM_TOKEN = 'fcmToken';
export const USER_ID = 'userId';
export const CHAT_USER_KEY = 'chatUserKey';
export const token_expire_message = 'Invalid or expired token';
export const first_time = 'User First Time';
export const err_image_uploading_msg =
  'Error while uploading image, Please try again!!';

export enum Orientation {
  landscape = 'landscape',
  portrait = 'portrait',
}

export const modalStoryValues = [
  {
    content:
      'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'https://img.freepik.com/free-photo/indoor-shot-beautiful-happy-african-american-woman-smiling-cheerfully-keeping-her-arms-folded-relaxing-indoors-after-morning-lectures-university_273609-1270.jpg',
    type: 'image',
    finish: 0,
  },
  {
    content:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    type: 'video',
    finish: 0,
  },
  {
    content:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    type: 'video',
    finish: 0,
  },
  {
    content: 'https://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
    type: 'video',
    finish: 0,
  },
];

export const userStories = [
  {
    id: 1, //unique id (required)
    username: 'Alan', //user name on header
    title: 'Albums', //title below username
    profile:
      'https://sosugary.com/wp-content/uploads/2022/01/TheWeeknd_001.jpg', //user profile picture
    stories: [
      {
        id: 0, //unique id (required)
        url: 'https://i1.sndcdn.com/artworks-IrhmhgPltsdrwMu8-thZohQ-t500x500.jpg', // story url
        type: 'image', //image or video type of story
        duration: 5, //default duration
        storyId: 1,
        isSeen: false,
      },
      {
        id: 1,
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video',
        duration: 15,
        storyId: 1,
        isSeen: false,
      },
    ],
  },
];

export const showToast = (
  type: ToastType,
  header: string,
  message: string,
  visibilityTime?: number,
) => {
  Toast.show({
    type: type,
    text1: header,
    text2: message,
    visibilityTime: visibilityTime ?? 3000,
  });
};

// Function to store value in AsyncStorage
export const storeData = async (tokenVal: string, tokenKey: string) => {
  try {
    await AsyncStorage.setItem(tokenKey, tokenVal);
    // console.log('Data stored successfully.');
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Function to retrieve value from AsyncStorage
export const getData = async (tokenKey: string) => {
  try {
    const value = await AsyncStorage.getItem(tokenKey);
    if (value !== null) {
      return value;
    } else {
      console.log('No data found in AsyncStorage.');
    }
    return value;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export const expandableData = [
  {id: 0, name: 'Highlights'},
  {id: 1, name: 'Recent Pins'},
  {id: 2, name: 'Favorite Spots'},
  {id: 3, name: 'Interests'},
];

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
