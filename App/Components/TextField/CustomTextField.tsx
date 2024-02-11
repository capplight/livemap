import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
  KeyboardType,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../Themes/Colors';
import {FeatherIcon} from '../../Themes/Icons';

interface TextFieldProps {
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textOverrideStyle?: StyleProp<TextStyle | ViewStyle>;
  placeHolder: string;
  isPassword?: boolean;
  autoCapitalize?: boolean;
  keyboardType?: KeyboardType;
}

export const CustomTextField = ({
  placeHolder,
  isPassword = false,
  autoCapitalize = true,
  keyboardType = 'default',
}: TextFieldProps) => {
  const [text, onChangeText] = useState('');
  const [visibleText, setVisibility] = useState(true);
  return (
    <SafeAreaView style={{justifyContent: 'center'}}>
      <TextInput
        value={text}
        style={styles.input}
        placeholder={placeHolder}
        keyboardType={keyboardType}
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
          <FeatherIcon name="eye-off" color={'white'} size={wp(5)} />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: hp(5),
    width: hp(42),
    marginVertical: hp(1),
    backgroundColor: Colors.textLight,
    color: 'white',
    borderRadius: 4,
    padding: 10,
  },
  visibilityStyles: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: wp(2),
    padding: 2,
  },
});
