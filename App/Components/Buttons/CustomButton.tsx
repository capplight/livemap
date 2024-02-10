import {Colors} from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import {FeatherIcon} from '../../Themes/Icons';
import React from 'react';
import {
  View,
  Text,
  StyleProp,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  isLoading?: boolean;
  isButton?: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  children?: any;
  textOverrideStyle?: StyleProp<TextStyle | ViewStyle>;
  label?: string;
  addIcon?: boolean;
  icon?: any;
  isGradient?: boolean;
  gradientColors?: Array<any>;
}
const uploadButton = FeatherIcon({
  name: 'upload',
  color: Colors.d_1,
  size: wp(4),
});

const CustomButton = ({
  isLoading,
  isButton = true,
  onPress,
  containerStyle,
  children,
  textOverrideStyle,
  label,
  addIcon = false,
  icon = uploadButton,
  isGradient = false,
  gradientColors = [],
}: Props) => {
  const buttonStyle = isButton ? {...styles.buttonContainer} : {};

  return (
    <TouchableOpacity
      hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}
      disabled={isLoading}
      activeOpacity={0.8}
      onPress={onPress}
      style={
        isGradient
          ? isLoading
            ? [buttonStyle, containerStyle]
            : []
          : [buttonStyle, containerStyle]
      }>
      {label ? (
        isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : isGradient ? (
          <LinearGradient
            colors={
              gradientColors?.length > 0
                ? gradientColors
                : ['#B00C22', '#E0243E']
            }
            style={[buttonStyle, containerStyle]}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              {addIcon && icon}
              <Text style={[styles.textStyle, textOverrideStyle]}>{label}</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {addIcon && icon}
            <Text style={[styles.textStyle, textOverrideStyle]}>{label}</Text>
          </View>
        )
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: wp(50),
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: wp(3.5),
    fontWeight: '500',
    marginLeft: wp(2.5),
    // fontFamily: Fonts.robotoRegular,
  },
});

export default CustomButton;
