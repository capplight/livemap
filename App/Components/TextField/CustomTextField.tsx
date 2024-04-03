import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  Pressable,
  KeyboardType,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../Themes/Colors';
import {FeatherIcon} from '../../Themes/Icons';

interface TextFieldProps {
  icon?: any;
  value: string;
  showIcon?: boolean;
  placeHolder: string;
  isPassword?: boolean;
  autoCapitalize?: boolean;
  onChangeText: (val: string) => void;
  keyboardType?: KeyboardType;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<ViewStyle>;
}

export const CustomTextField = ({
  icon,
  value,
  placeHolder,
  onChangeText,
  containerStyle,
  textInputStyle,
  showIcon = false,
  isPassword = false,
  autoCapitalize = true,
  keyboardType = 'default',
}: TextFieldProps) => {
  const [visibleText, setVisibility] = useState(true);
  return (
    <KeyboardAvoidingView style={[styles.container, containerStyle]}>
      {showIcon && icon}
      <TextInput
        value={value}
        numberOfLines={1}
        placeholder={placeHolder}
        placeholderTextColor={Colors.fadeWhite}
        keyboardType={keyboardType}
        style={[styles.input, textInputStyle]}
        autoCapitalize={autoCapitalize ? 'sentences' : 'none'}
        onChangeText={val => onChangeText(val)}
        secureTextEntry={isPassword ? visibleText : !visibleText}
      />
      {isPassword && (
        <Pressable
          onPress={() => {
            setVisibility(!visibleText);
          }}
          style={styles.visibilityStyles}>
          <FeatherIcon
            name={`${!visibleText ? 'eye' : 'eye-off'}`}
            color={'white'}
            size={wp(5)}
          />
        </Pressable>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(5),
    marginVertical: hp(1),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: Colors.textLight,
  },
  input: {
    height: hp(5),
    width: hp(42),
    color: 'white',
    fontSize: hp(1.5),
    marginVertical: hp(1),
  },
  visibilityStyles: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: wp(2),
    padding: wp(2),
  },
});
