import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
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
  FCM_TOKEN,
  OrHorizontalLine,
  TOKEN_KEY,
  USER_ID,
  baseUrl,
  homeNavigation,
  horizontalLine,
  showToast,
  storeData,
} from '@constants/constValues';
import {socialMediaButton} from '@components/Buttons/SocialMediaButton';
import {Formik} from 'formik';
import {signInDataSchema} from '../Services/validationSchema';
import axios from 'axios';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {REACT_APP_BASE_URL_DEV} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Login {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Login: FC<Login> = ({navigation}: Login) => {
  const [isLoading, setLoader] = useState(false);
  // const {setToken} = useToken();
  const [fcmToken, setFCMToken] = useState('');

  console.log('Show fcm token: ', fcmToken);

  async function callUserSignInApi(value: any) {
    setLoader(true);
    try {
      const response = await axios.post(`${baseUrl}/dev/manageOauth`, value);
      showToast('success', 'Success', 'Successfully logged in');
      // setToken(response?.data?.token);
      const token = response?.data?.token;
      const userId = response?.data?._id;
      storeData(token, TOKEN_KEY);
      storeData(userId, USER_ID);
      sendFCM(token);
    } catch (err) {
      console.log('Error message:', err);
      showToast(
        'error',
        'Error',
        'Please check your credentials and try again!!',
      );
      setLoader(false);
    }
  }

  const sendFCM = async (token: string) => {
    console.log('Show token: ', token);
    console.log('Show fcm token: ', fcmToken);
    const params = JSON.stringify({fcm_token: fcmToken});
    await axios
      .put(`${REACT_APP_BASE_URL_DEV}/dev/user`, params, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('Show response: ', response?.data?.message);
        homeNavigation({navigation});
        setLoader(false);
      })
      .catch(error => {
        console.error('Error sending message:', error);
        if (error?.response?.status === 403) {
          navigation.navigate('Login', {});
        }
        setLoader(false);
      });
  };

  useEffect(() => {
    getFCMToken();
    changeNavigationBarColor('transparent');
  }, []);

  async function getFCMToken() {
    const val = await AsyncStorage.getItem(FCM_TOKEN);
    setFCMToken(val!);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.backgroundColor} />
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
            // initialValues={{email: 'gaurab@apples.com', password: 'P@ssw00rd'}}
            initialValues={{email: 'test@apple.com', password: 'Test123'}}
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
  },
});
