import {Colors} from '@themes/Colors';
import Fonts from '@themes/Fonts';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const size = 40;
export const exportStyles = StyleSheet.create({
  avatarSquareWrapper: {
    height: hp(12),
    width: wp(20),
    borderRadius: 4,
    borderWidth: hp(0.2),
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
  row: {flexDirection: 'row'},
});
