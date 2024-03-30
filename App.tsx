import React, {useEffect} from 'react';
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
import {CHAT_USER_KEY, FCM_TOKEN, storeData} from '@constants/constValues';

const App: React.FC = () => {
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
      // storeData(CHAT_USER_KEY, remoteMessage);
    });

  const getDeviceToken = async () => {
    let msgToken = await messaging().getToken();
    storeData(msgToken, FCM_TOKEN);
    // console.log('Message token: ', msgToken);
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message in foreground: ', remoteMessage);
      const newMessage = JSON.stringify(remoteMessage);
      storeData(newMessage, CHAT_USER_KEY);
    });

    return unsubscribe;
  }, []);

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
            <AppNavigation />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </UserTokenProvider>
  );
};

export default App;
