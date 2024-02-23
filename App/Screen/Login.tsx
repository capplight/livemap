import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {Text, StyleSheet, View, Pressable, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../Themes/Colors';
import Fonts from '../Themes/Fonts';
import {Ionicons} from '../Themes/Icons';
import {CustomTextField} from '../Components/TextField/CustomTextField';
import {LoginButton} from '../Components/Buttons/LoginButton';
import {
  OrHorizontalLine,
  baseUrl,
  homeNavigation,
  horizontalLine,
  showToast,
} from '@constants/constValues';
import {socialMediaButton} from '@components/Buttons/SocialMediaButton';
import {Formik} from 'formik';
import {signInDataSchema} from '../Services/validationSchema';
import axios from 'axios';
import {useToken} from '@constants/userContext';

interface Login {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Login: FC<Login> = ({navigation}: Login) => {
  const [isLoading, setLoader] = useState(false);
  const {setToken} = useToken();
  function callUserSignInApi(value: any) {
    setLoader(true);
    return axios
      .post(`${baseUrl}/dev/manageOauth`, value)
      .then(response => {
        showToast('success', 'Success', 'Successfully logged in');
        setToken(response?.data?.token);
        homeNavigation({navigation});
        setLoader(false);
      })
      .catch(err => {
        console.log('Error message:', err);
        showToast(
          'error',
          'Error',
          'Please check your credentials and try again!!',
        );
        setLoader(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              navigation.navigate('Splash');
            }}
            style={{alignSelf: 'flex-end', margin: wp(2), padding: hp(1)}}>
            <Ionicons name="close" color={'white'} size={wp(8)} />
          </Pressable>
          <Text style={styles.appNameText}>LiveMap</Text>
          <Formik
            initialValues={{email: 'gaurab@apple.com', password: 'P@ssw00rd'}}
            validationSchema={signInDataSchema}
            onSubmit={values => callUserSignInApi(values)}>
            {({handleChange, handleSubmit, values, errors}) => (
              <>
                <CustomTextField
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize={false}
                  keyboardType="email-address"
                  placeHolder="Phone number, username or email"
                />
                {errors && (
                  <Text style={styles.errorMessageStyles}>{errors.email}</Text>
                )}
                <CustomTextField
                  value={values.password}
                  onChangeText={handleChange('password')}
                  isPassword={true}
                  placeHolder="Password"
                />
                {errors && (
                  <Text style={styles.errorMessageStyles}>
                    {errors.password}
                  </Text>
                )}
                <Pressable
                  style={{alignSelf: 'flex-end', marginBottom: hp(2)}}
                  onPress={() => {}}>
                  <Text style={styles.text}>Forgot Password?</Text>
                </Pressable>
                <LoginButton
                  label="Log in"
                  loading={isLoading}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
          {OrHorizontalLine()}
          <View style={{marginTop: hp(-1)}}>
            {socialMediaButton(true, () => {})}
          </View>
          {socialMediaButton(false, () => {})}
          <View style={{height: hp(30)}} />
          <View style={{bottom: hp(2), position: 'absolute'}}>
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
                    {
                      marginVertical: hp(0),
                      fontSize: hp(2),
                      fontWeight: 'bold',
                    },
                  ]}>
                  Sign up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
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
  bottomTextStyles: {
    marginHorizontal: wp(3),
    textAlign: 'center',
    color: Colors.lightWhite,
    opacity: 0.5,
    marginBottom: hp(2),
  },
  bold: {fontWeight: 'bold', color: 'white', opacity: 1},
  errorMessageStyles: {
    fontSize: hp(1.2),
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: wp(6),
    marginTop: hp(-1),
    // marginBottom: hp(1),
  },
});
