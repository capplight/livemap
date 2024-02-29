import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AntDesignIcon} from '@themes/Icons';
import {SVGRenderer} from '@components/SVGRenderer';
import FacebookIcon from '@assets/svg/Facebook.svg';
import {Colors} from '@themes/Colors';

export const socialMediaButton = (isGoogle: boolean, onPress: () => void) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.socialMediaButtonStyles}>
      <View style={styles.containerView}>
        <View style={{marginRight: wp(isGoogle ? 22 : 21)}}>
          {isGoogle ? (
            <AntDesignIcon name={'google'} color={'white'} size={wp(5)} />
          ) : (
            <SVGRenderer touchable={false}>
              <FacebookIcon />
            </SVGRenderer>
          )}
        </View>
        <Text style={styles.textStyles}>
          {`Continue with ${isGoogle ? 'Google' : 'Facebook'}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    marginHorizontal: wp(2),
    alignItems: 'center',
  },
  textStyles: {
    fontWeight: 'bold',
    fontSize: wp(4),
    color: 'white',
  },
  socialMediaButtonStyles: {
    width: wp(90),
    height: hp(5),
    marginVertical: hp(0.5),
    marginHorizontal: wp(4),
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: Colors.primaryColor,
  },
});
