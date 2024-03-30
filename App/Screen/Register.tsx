import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
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
  OrHorizontalLine,
  homeNavigation,
  horizontalLine,
  mapStyle,
  showToast,
} from '@constants/constValues';
import {socialMediaButton} from '@components/Buttons/SocialMediaButton';
import {Formik} from 'formik';
import {signUpDataSchema} from '@services/validationSchema';
import {useDispatch} from 'react-redux';
import {SignupRequest} from '@redux/Signup/SignupAction';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/Reducers';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {exportStyles} from '@components/ExportStyles';
interface Register {
  navigation: StackNavigationProp<any>;
  route?: any;
}

const ErrorText = (text: any) => {
  return <Text style={styles.errorMessageStyles}>{text}</Text>;
};

export const Register: FC<Register> = ({navigation}: Register) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const {fetching, isAuthorized} = useSelector(
    (state: RootState) => state?.signup,
  );
  const [curtLat, setCurLat] = useState(0);
  const [curtLong, setCurLong] = useState(0);
  const [curLoc, setCurLoc] = useState({
    latitude: 30.7993,
    longitude: 76.9149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function getMyCurrentPosition() {
    try {
      Geolocation.getCurrentPosition(
        position => {
          setCurLat(position.coords.latitude);
          setCurLong(position.coords.longitude);
          setCurLoc({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {}
  }

  useEffect(() => {
    getMyCurrentPosition();
  }, [curtLat, curtLong, isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      homeNavigation({navigation});
    }
  }, [isAuthorized, navigation]);

  function showMapView() {
    return (
      <MapView
        loadingEnabled
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={curLoc}>
        <Marker
          draggable={true}
          coordinate={{
            latitude: curtLat!!,
            longitude: curtLong!!,
          }}
          onDragEnd={e => {
            setCurLoc(e.nativeEvent.coordinate);
          }}
        />
      </MapView>
    );
  }

  useEffect(() => {
    changeNavigationBarColor('transparent');
  }, []);

  return (
    <SafeAreaView style={exportStyles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Pressable
            style={{alignSelf: 'flex-end', margin: wp(2), padding: hp(2)}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="close" color={'white'} size={wp(8)} />
          </Pressable>
          <Text style={styles.appNameText}>LiveMap</Text>
          <Text style={styles.text1}>
            Sign up so you can track live events more efficiently.
          </Text>
          {showMapView()}
          <Text style={styles.noteText}>
            Note: Please use long press to drag the marker on your desired
            location or your current location will be set as default.
          </Text>
          <Formik
            initialValues={{
              email: '',
              full_name: '',
              user_name: '',
              password: '',
            }}
            validationSchema={signUpDataSchema}
            onSubmit={values => {
              let formattedName = values?.full_name.split(' ');
              const sendingValues = {
                email: values?.email,
                first_name: formattedName[0],
                last_name: formattedName[1],
                user_name: values?.user_name,
                password: values?.password,
                metaData: curLoc,
              };
              dispatch(SignupRequest(sendingValues));
            }}>
            {({handleChange, handleSubmit, values, errors}) => (
              <>
                <CustomTextField
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize={false}
                  keyboardType="email-address"
                  placeHolder="Phone number or email"
                />
                {errors && ErrorText(errors?.email)}
                <CustomTextField
                  value={values.full_name}
                  onChangeText={handleChange('full_name')}
                  placeHolder="Full name (Optional)"
                />
                {errors && ErrorText(errors?.full_name)}
                <CustomTextField
                  value={values.user_name}
                  autoCapitalize={false}
                  onChangeText={handleChange('user_name')}
                  placeHolder="Username"
                />
                {errors && ErrorText(errors?.user_name)}
                <CustomTextField
                  value={values.password}
                  onChangeText={handleChange('password')}
                  isPassword={true}
                  placeHolder="Password"
                />
                {errors && ErrorText(errors?.password)}
                <LoginButton
                  label="Sign up"
                  loading={fetching}
                  onPress={handleSubmit}
                  buttonContainerStyle={{marginTop: hp(2)}}
                />
              </>
            )}
          </Formik>
          {OrHorizontalLine()}
          <View style={{marginTop: hp(-1)}}>
            {socialMediaButton(true, () => {})}
          </View>
          {socialMediaButton(false, () => {})}
          <View style={{height: hp(5)}} />
          <View style={{bottom: hp(-6)}}>
            <Text style={styles.bottomTextStyles}>
              Message and data rates may apply. By continuing, you agree to our
              <Text style={styles.bold}> Terms of Use</Text> and
              <Text style={styles.bold}> Privacy Policy.</Text>
            </Text>
            {horizontalLine(wp(100))}
            <View style={styles.bottomViewStyles}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.text2}>Back to log in</Text>
              </Pressable>
            </View>
          </View>
          <View style={{height: hp(8)}} />
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
  map: {
    width: wp(98),
    height: hp(30),
  },
  appNameText: {
    fontFamily: Fonts.righteousRegular,
    fontSize: hp(5),
    marginTop: hp(3),
    marginBottom: hp(1),
    color: 'white',
    alignSelf: 'center',
  },
  buttonStyles: {
    height: hp(5),
    width: hp(42),
    backgroundColor: Colors.activeColor,
  },
  text: {
    color: Colors.textBlue,
    textAlign: 'right',
    fontSize: hp(1.5),
    marginVertical: hp(0.5),
    marginRight: wp(2),
  },
  text1: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: 'bold',
    marginBottom: hp(4),
    textAlign: 'center',
    marginHorizontal: wp(4),
  },
  text2: {
    color: Colors.textBlue,
    textAlign: 'right',
    marginRight: wp(2),
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  noteText: {
    padding: wp(1),
    alignSelf: 'flex-start',
    fontStyle: 'italic',
    marginLeft: wp(1),
    marginBottom: hp(2),
  },
  buttonContainerStyle: {
    height: hp(5),
    width: wp(90),
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
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
  bottomViewStyles: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: hp(1),
  },
});
