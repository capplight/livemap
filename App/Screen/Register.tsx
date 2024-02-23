import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
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
  homeNavigation,
  horizontalLine,
} from '@constants/constValues';
import {socialMediaButton} from '@components/Buttons/SocialMediaButton';
interface Register {
  navigation: StackNavigationProp<any>;
  route?: any;
}

export const Register: FC<Register> = ({navigation}: Register) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable
            style={{alignSelf: 'flex-end', margin: wp(2), padding: hp(2)}}
            onPress={() => {
              navigation.navigate('Splash');
            }}>
            <Ionicons name="close" color={'white'} size={wp(8)} />
          </Pressable>
          <Text style={styles.appNameText}>LiveMap</Text>
          <Text
            style={[
              styles.bold,
              {
                fontSize: hp(2),
                marginHorizontal: wp(4),
                marginBottom: hp(4),
                textAlign: 'center',
              },
            ]}>
            Sign up so you can track live events more efficiently.
          </Text>
          <CustomTextField
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
            autoCapitalize={false}
            keyboardType="email-address"
            placeHolder="Phone number or email"
          />
          <CustomTextField
            value={name}
            onChangeText={val => {
              setName(val);
            }}
            placeHolder="Full name (Optional)"
          />
          <CustomTextField
            value={userName}
            onChangeText={val => {
              setUsername(val);
            }}
            placeHolder="Username"
          />
          <CustomTextField
            value={password}
            onChangeText={val => {
              setPassword(val);
            }}
            isPassword={true}
            placeHolder="Password"
          />
          <LoginButton
            label="Sign up"
            onPress={() => {
              homeNavigation({navigation});
            }}
            buttonContainerStyle={{marginTop: hp(2)}}
          />
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
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: hp(1),
              }}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
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
                  Back to log in
                </Text>
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
  appNameText: {
    fontFamily: Fonts.righteousRegular,
    fontSize: hp(5),
    marginTop: hp(3),
    marginBottom: hp(1),
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
  bottomTextStyles: {
    marginHorizontal: wp(3),
    textAlign: 'center',
    color: Colors.lightWhite,
    opacity: 0.5,
    marginBottom: hp(2),
  },
  bold: {fontWeight: 'bold', color: 'white', opacity: 1},
});
