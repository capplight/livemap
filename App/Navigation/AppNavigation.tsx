import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Colors} from '../Themes/Colors';
import BottomTabNavigation from './BottomTabNavigation';
import {SplashScreen} from '../Screen/SplashScreen';
import {Login} from '../Screen/Login';
import {Register} from '../Screen/Register';
// import {TabAppSwitch} from '@components/TabSwitch/tabAppSwitch';
// import {LoginScreen} from '../Screen/Auth/LoginScreen';
// import {LogoutScreen} from '../Screen/Auth/Logout';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      })}>
      <Stack.Screen name="tabs" component={BottomTabNavigation} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register', headerShown: false}}
      />

      {/* <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: 'Logout User',
          // headerShown: false,
          header: () => {
            return <DefaultLayout />;
          },
        }}
      /> */}

      {/* <Stack.Screen
        name="TabAppSwitch"
        component={TabAppSwitch}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};
