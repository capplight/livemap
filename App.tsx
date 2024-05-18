import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {isReadyRef, navigationRef} from './App/Navigation/RootNavigationRef';
import {store} from './App/Config/AppStore';
import {AppNavigation} from './App/Navigation/AppNavigation';
import {StatusBar} from 'react-native';
import {UserTokenProvider} from '@constants/userContext';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {CHAT_USER_KEY, FCM_TOKEN, storeData} from '@constants/constValues';

const App: React.FC = () => {
  const [isFocused, setFocused] = useState(false);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage,
      );
    });

  const getDeviceToken = async () => {
    let msgToken = await messaging().getToken();
    storeData(msgToken, FCM_TOKEN);
    console.log('Message token: ', msgToken);
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  async function notification(message: any) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.requestPermission();
    await notifee.displayNotification({
      title: message?.notification?.title,
      body: message?.notification?.body,
      android: {
        channelId,
      },
    });
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      !isFocused && notification(remoteMessage);
      // console.log('Message in foreground: ', isFocused, remoteMessage);
      const newMessage = JSON.stringify(remoteMessage);
      storeData(newMessage, CHAT_USER_KEY);
    });

    return unsubscribe;
  }, [isFocused]);

  return (
    <UserTokenProvider>
      <Provider store={store}>
        <StatusBar hidden={false} backgroundColor="transparent" />
        <SafeAreaProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}>
            <AppNavigation handleChatScreenValue={setFocused} />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </UserTokenProvider>
  );
};

export default App;
