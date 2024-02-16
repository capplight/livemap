import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {CommonActions} from '@react-navigation/routers';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../Themes/Colors';
import Fonts from '../Themes/Fonts';
import CustomButton from '../Components/Buttons/CustomButton';
import {homeNavigation} from '@constants/constValues';

interface SplashScreen {
  navigation: StackNavigationProp<any>;
  route?: any;
}

const chatImage = (header: string, message: string) => {
  return (
    <View style={styles.notificationBackground}>
      <Image
        source={require('../Assets/icons/LogoSmall.png')}
        style={{
          height: hp(4),
          width: wp(8),
          marginLeft: wp(3),
        }}
      />
      <View style={{marginLeft: wp(2.5)}}>
        <Text style={styles.chatTextHeader}>{header}</Text>
        <Text style={{color: Colors.textLight}}>{message}</Text>
      </View>
    </View>
  );
};

export const chatView = () => {
  return (
    <View style={{marginTop: hp(6)}}>
      {chatImage('Live Concert Astana Area', '4 km away')}
      <View style={[styles.reverseChatView]}>
        {chatImage('Happy hour at My Place', '2 km away')}
      </View>
      <View style={[styles.reverseChatView2, {}]}>
        {chatImage('Live Concert Astana Area', '4 km away')}
      </View>
      {chatImage('Your spot is having a Quiz Night', '12 km away')}
    </View>
  );
};

export const SplashScreen: FC<SplashScreen> = ({navigation}: SplashScreen) => {
  const [isStarted, setStart] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../Assets/icons/backgroundCover.png')}
        style={[
          styles.imageStyles,
          isStarted ? {height: hp(87)} : {height: hp(100)},
        ]}
      />
      {chatView()}
      {!isStarted && (
        <Text style={[styles.text]}>
          {'Your City, Your Events, Your Moment. \n Welcome to LiveMap'}
        </Text>
      )}
      <CustomButton
        label={isStarted ? 'Explore the app' : 'Get Started'}
        containerStyle={[
          styles.buttonContainerStyle,
          isStarted ? {width: wp(80)} : {width: wp(50)},
        ]}
        textOverrideStyle={{fontSize: hp(2)}}
        onPress={() => {
          isStarted ? homeNavigation({navigation}) : setStart(!isStarted);
        }}
      />
      {isStarted && (
        <View
          style={{alignSelf: 'center', position: 'absolute', bottom: hp(8)}}>
          <Text style={styles.appNameText}>LiveMap</Text>
          <CustomButton
            label="Log in"
            containerStyle={[styles.buttonContainerStyle2]}
            textOverrideStyle={{fontSize: hp(2)}}
            onPress={() => {
              navigation.navigate('Login');
              // setStart(!isStarted);
            }}
          />
          <CustomButton
            label="Sign up"
            containerStyle={[styles.buttonContainerStyle2, {bottom: hp(14)}]}
            textOverrideStyle={{fontSize: hp(2)}}
            onPress={() => {
              navigation.navigate('Register');
              // setStart(!isStarted);
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  appNameText: {
    fontFamily: Fonts.righteousRegular,
    fontSize: hp(5),
    marginBottom: hp(14),
    color: 'white',
    alignSelf: 'center',
  },
  imageStyles: {height: hp(100), width: wp(100), position: 'absolute'},
  buttonContainerStyle2: {
    height: hp(6),
    width: wp(80),
    backgroundColor: Colors.activeColor,
  },
  reverseChatView: {
    flexDirection: 'row-reverse',
    marginVertical: hp(4),
    marginLeft: wp(4),
  },
  reverseChatView2: {
    flexDirection: 'row-reverse',
    marginVertical: hp(4),
    marginLeft: wp(12),
    marginTop: hp(-1),
    opacity: 0.75,
  },
  chatTextHeader: {
    width: wp(50),
    color: Colors.primaryColor,
    fontWeight: '500',
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    bottom: hp(14),
    fontSize: hp(2),
    position: 'absolute',
    fontFamily: Fonts.robotoSemiBold,
  },
  buttonContainerStyle: {
    width: wp(50),
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(3),
  },
  notificationBackground: {
    height: hp(6),
    width: wp(64),
    borderRadius: 8,
    marginLeft: wp(4),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.notificationBackgroundColor,
    flexDirection: 'row',
  },
});
