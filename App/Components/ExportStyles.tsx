import React from 'react';
import {Colors} from '@themes/Colors';
import {
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {profileImageLink} from '@constants/constValues';

interface ImageStyleProps {
  size?: number;
  link?: string;
}
export const CircularImage = ({size = 72, link}: ImageStyleProps) => {
  return (
    <Image
      source={{
        uri: link ?? profileImageLink,
      }}
      style={{height: size, width: size, borderRadius: size / 2}}
    />
  );
};

export const MyHeader = () => <View style={exportStyles.myHeaderViewStyles} />;

const size = 40;
export const exportStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  avatarSquareWrapper: {
    height: hp(12),
    width: wp(20),
    borderRadius: 4,
    borderWidth: hp(0.2),
  },
  myHeaderViewStyles: {
    height: hp(8),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.backgroundDark,
  },
  shadowProp: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  roundImageStyles: {
    height: size,
    width: size,
    borderRadius: size / 2,
  },
  text1: {
    color: 'white',
    fontSize: hp(1.5),
    fontWeight: 'bold',
  },
  text2: {
    color: Colors.lightWhite,
    opacity: 0.5,
    fontSize: hp(1.2),
  },
  text3: {color: 'white', fontSize: hp(1.8), fontWeight: 'bold'},
  text4: {color: Colors.lightWhite, opacity: 0.5, fontSize: hp(1.5)},
  text5: {color: 'white', fontSize: hp(1.5), fontWeight: 'bold'},
  row: {flexDirection: 'row'},
});
