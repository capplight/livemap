import React from 'react';
import CustomButton from './CustomButton';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../Themes/Colors';

interface LoginButtonProps {
  label: string;
  loading?: boolean;
  onPress: () => void;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle | ViewStyle>;
}

export const LoginButton = ({
  label = 'Log in',
  loading = false,
  onPress,
  buttonContainerStyle,
  textStyles,
}: LoginButtonProps) => {
  return (
    <CustomButton
      isLoading={loading}
      label={label}
      containerStyle={[styles.buttonContainerStyle, buttonContainerStyle]}
      textOverrideStyle={[styles.buttonText, textStyles]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    height: hp(5),
    width: wp(90),
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: Colors.activeColor,
  },
  buttonText: {
    fontSize: hp(2),
    color: Colors.lightWhite,
    opacity: 0.8,
  },
});
