import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {CommonActions} from '@react-navigation/routers';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../Themes/Colors';
import Fonts from '../Themes/Fonts';
import {AntDesignIcon, Ionicons} from '../Themes/Icons';
import {CustomTextField} from '../Components/TextField/CustomTextField';
import {LoginButton} from '../Components/Buttons/LoginButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SVGRenderer} from '../Components/SVGRenderer';
import FacebookIcon from '@assets/svg/Facebook.svg';

interface Login {
  navigation: StackNavigationProp<any>;
  route?: any;
}

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

export const socialMediaButton = (isGoogle: boolean, onPress: () => void) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.socialMediaButtonStyles}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(2),
          alignItems: 'center',
        }}>
        <View style={{marginRight: wp(isGoogle ? 22 : 21)}}>
          {isGoogle ? (
            <AntDesignIcon name={'google'} color={'white'} size={wp(5)} />
          ) : (
            <SVGRenderer touchable={false}>
              <FacebookIcon />
            </SVGRenderer>
          )}
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: wp(4),
            color: 'white',
          }}>
          {`Continue with ${isGoogle ? 'Google' : 'Facebook'}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const Login: FC<Login> = ({navigation}: Login) => {
  function homeNavigation() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'tabs'}],
      }),
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Splash');
        }}
        style={{alignSelf: 'flex-end', margin: wp(2), padding: hp(1)}}>
        <Ionicons name="close" color={'white'} size={wp(8)} />
      </Pressable>
      <Text style={styles.appNameText}>LiveMap</Text>
      <CustomTextField
        autoCapitalize={false}
        keyboardType="email-address"
        placeHolder="Phone number, username or email"
      />
      <CustomTextField isPassword={true} placeHolder="Password" />
      <Pressable
        style={{alignSelf: 'flex-end', marginBottom: hp(2)}}
        onPress={() => {}}>
        <Text style={styles.text}>Forgot Password?</Text>
      </Pressable>
      <LoginButton
        label="Log in"
        onPress={() => {
          homeNavigation();
        }}
      />
      {OrHorizontalLine()}
      <View style={{marginTop: hp(-1)}}>
        {socialMediaButton(true, () => {})}
      </View>
      {socialMediaButton(false, () => {})}
      <View style={{bottom: hp(-20)}}>
        <Text style={styles.bottomTextStyles}>
          Message and data rates may apply. By continuing, you agree to our
          <Text style={styles.bold}> Terms of Use</Text> and
          <Text style={styles.bold}> Privacy Policy.</Text>
        </Text>
        {horizontalLine(wp(100))}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: hp(1),
          }}>
          <Text
            style={[
              styles.bottomTextStyles,
              {marginHorizontal: wp(1.2), fontSize: hp(2)},
            ]}>
            Don't have an account?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text
              style={[
                styles.text,
                {marginVertical: hp(0), fontSize: hp(2), fontWeight: 'bold'},
              ]}>
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  appNameText: {
    fontFamily: Fonts.righteousRegular,
    fontSize: hp(5),
    marginTop: hp(8.5),
    marginBottom: hp(4),
    color: 'white',
    alignSelf: 'center',
  },
  text: {
    color: Colors.textBlue,
    textAlign: 'right',
    fontSize: hp(1.5),
    marginVertical: hp(0.5),
    marginRight: wp(2),
  },
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
  bottomTextStyles: {
    marginHorizontal: wp(3),
    textAlign: 'center',
    color: Colors.lightWhite,
    opacity: 0.5,
    marginBottom: hp(2),
  },
  bold: {fontWeight: 'bold', color: 'white', opacity: 1},
});
