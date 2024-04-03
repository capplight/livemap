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
import ChatScreen from '@screens/Chat/ChatScreen';
import {ChatList} from '@screens/Chat/ChatList';

const Stack = createStackNavigator();

interface AppNavigationProps {
  handleChatScreenValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppNavigation = ({handleChatScreenValue}: AppNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        navigationBarColor: Colors.backgroundColor,
        headerShown: false,
      })}>
      <Stack.Screen name="tabs" component={BottomTabNavigation} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatScreen">
        {(props: any) => (
          <ChatScreen {...props} isScreenFocused={handleChatScreenValue} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
