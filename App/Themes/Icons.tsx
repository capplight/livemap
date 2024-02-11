import React from 'react';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Foundation';
import Icon5 from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon7 from 'react-native-vector-icons/Feather';
import Icon8 from 'react-native-vector-icons/MaterialIcons';
import Icon9 from 'react-native-vector-icons/Octicons';
import {Dimensions, Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const deviceHeight =
  Platform.OS === 'android'
    ? require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
    : Dimensions.get('window').height;

interface IconParams {
  name: string;
  color?: string;
  size: number;
}

//FontAwesome
export const FontAwesomeIcon = ({
  name,
  color = 'black',
  size = 30,
}: IconParams) => {
  return <Icon1 name={name} color={color} size={size} />;
};

//AntDesign
export const AntDesignIcon = ({
  name,
  color = 'black',
  size = 30,
}: IconParams) => {
  return <Icon2 name={name} color={color} size={size} />;
};

//Entypo
export const EntypoIcon = ({name, color = 'black', size = 30}: IconParams) => {
  return <Icon3 name={name} color={color} size={size} />;
};

//Foundation
export const FoundationIcon = ({
  name,
  color = 'black',
  size = 30,
}: IconParams) => {
  return <Icon4 name={name} color={color} size={size} />;
};

//Ionicons
export const Ionicons = ({name, color = 'black', size = 30}: IconParams) => {
  return <Icon5 name={name} color={color} size={size} />;
};

//MaterialCommunityIcons
export const MaterialCommunityIcon = ({
  name,
  color = 'black',
  size = 30,
}: IconParams) => {
  return <Icon6 name={name} color={color} size={size} />;
};

//Feather icons
export const FeatherIcon = ({name, color = 'black', size = 30}: IconParams) => {
  return <Icon7 name={name} color={color} size={size} />;
};

//Material icons
export const MaterialIcon = ({
  name,
  color = 'black',
  size = 30,
}: IconParams) => {
  return <Icon8 name={name} color={color} size={size} />;
};

//OctIcons
export const OctIcon = ({name, color = 'black', size = 30}: IconParams) => {
  return <Icon9 name={name} color={color} size={size} />;
};
